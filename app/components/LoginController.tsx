'use client'

import { useState } from "react"
import { LoginView } from "./LoginView"
import { useAuth } from "@/app/context/AuthContext"
import { useMobileView } from "@/app/context/MobileContext"

export const LoginController = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const { isMobile } = useMobileView()
    
    const loginUser = async () => {
        setLoading(true)
        await login(email, password)
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
            isMobile={isMobile}
        />
    )
}