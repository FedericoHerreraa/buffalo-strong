
'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "@/app/types/types";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async (): Promise<string | undefined> => { return undefined },
    createUser: async (): Promise<string | undefined> => { return undefined; },
    logOut: () => { },
    loading: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error('Error:', error)
                return
            }

            if (data.session) {
                const idUser = data.session.user.id

                const { data: fullUser, error: fetchError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', idUser)
                    .single()

                if (fetchError) {
                    console.error("Error al obtener el perfil completo:", fetchError)
                    return
                }

                setUser(fullUser)
                setLoading(false)
            }
        };

        fetchSession()
        
    }, []);

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            console.error('Error:', error)
            return error.message;
        }

        const user = data.user

        const { data: fullUser, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (fetchError) {
            console.error("Error al obtener el perfil completo:", fetchError)
            return fetchError.message;
        }

        console.log(fullUser)
        setUser(fullUser)
    }

    const createUser = async (
        email: string,
        name: string,
        password: string,
        cuit: number,
        address: string
    ): Promise<string | undefined> => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, password, cuit, address }),
            });

            const result = await response.json();

            if (!result.success) {
                console.error('Error al registrar usuario:', result.error);
                return result.error;
            }

            console.log('Usuario creado:', result.user);
        } catch (error) {
            console.error('Error en el registro:', error);
            return `${error}`;
        }
    };

    const logOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ login, user, createUser, logOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}