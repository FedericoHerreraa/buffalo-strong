'use client'

import { useState } from "react"
import { LoginView } from "./LoginView"
import { supabase } from "@/lib/supabaseClient"

export const LoginController = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, serLoading] = useState(false)
    
    const registerNewUser = async () => {
        serLoading(true)

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            console.error('Error:', error)
            serLoading(false)
            return
        }

        console.log('Data:', data.user)
        
        serLoading(false)
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