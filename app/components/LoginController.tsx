'use client'

import { useState } from "react"
import { LoginView } from "./LoginView"
import { useAuth } from "../context/AuthContext"

export const LoginController = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    
    const loginUser = async () => {
        setLoading(true)

        await register(email, password, 112233, 'ramon falcon')

        setLoading(false)
    }

    return (
        <LoginView 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loginUser={loginUser}
            loading={loading}
        />
    )
}