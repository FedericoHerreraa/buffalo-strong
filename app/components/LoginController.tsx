'use client'

import { useState } from "react"
import { LoginView } from "./LoginView"
import { supabase } from "@/lib/supabaseClient"

export const LoginController = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState(false)
    
    const registerNewUser = async () => {
        setLoading(true)

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            console.error('Error:', error)
            setLoading(false)
            return
        }

        const user = data.user
        if (!user) return { error: 'No se pudo acceder al usuario' }

        const { error: profileError } = await supabase.from('profiles').insert({
            id: user.id,
            role: 'user',
            cuit: 11223344,
            address: 'Ramon Falcon 6285'
        })

        if (profileError) {
            console.log(profileError)
            setLoading(false)
            return
        }


        const { data: fullUser, error: fetchError } = await supabase
            .from('profiles')
            .select('*')  
            .eq('id', user.id)  
            .single()

        if (fetchError) {
            console.error("Error al obtener el perfil completo:", fetchError)
            setLoading(false)
            return
        }

        // console.log("Usuario:", fullUser)

        console.log("Usuario completo:", { ...user, profile: fullUser })

        setLoading(false)
    }

    return (
        <LoginView 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            registerNewUser={registerNewUser}
            loading={loading}
        />
    )
}