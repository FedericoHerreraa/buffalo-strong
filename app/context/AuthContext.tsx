
'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "@/app/types/types";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => {},
    registerUser: () => {},
    logOut: () => {},
    loading: true
});

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
            }

            setLoading(false);
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
            return
        }

        const user = data.user

        const { data: fullUser, error: fetchError } = await supabase
            .from('profiles')
            .select('*')  
            .eq('id', user.id)  
            .single()

        if (fetchError) {
            console.error("Error al obtener el perfil completo:", fetchError)
            return
        }

        console.log(fullUser)
        setUser(fullUser)
    }

    const registerUser = async (
        email: string, 
        name: string,
        password: string, 
        cuit: number, 
        address: string,
    ) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            console.error('Error:', error)
            return
        }

        const user = data.user
        if (!user) return { error: 'No se pudo acceder al usuario' }

        const { error: profileError } = await supabase.from('profiles').insert({
            id: user.id,
            email: user.email,
            role: 'Cliente',
            cuit,
            name,
            address
        })

        if (profileError) {
            console.log(profileError)
            return
        }

        const { data: fullUser, error: fetchError } = await supabase
            .from('profiles')
            .select('*')  
            .eq('id', user.id)  
            .single()

        if (fetchError) {
            console.error("Error al obtener el perfil completo:", fetchError)
            return
        }

        console.log(fullUser)
        setUser(fullUser)
    }

    const logOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ login, user, registerUser, logOut, loading }}>
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