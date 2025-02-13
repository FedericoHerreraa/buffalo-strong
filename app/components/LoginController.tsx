'use client'

import { useState } from "react"
import { LoginView } from "./LoginView"
import { useAuth } from "../context/AuthContext"

export const LoginController = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const { login, user } = useAuth()
    
    const loginUser = async () => {
        setLoading(true)

        await login(email, password)
        console.log(user)

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