'use client'

import { LoginView } from "./LoginView"
import { useAuth } from "@/app/context/AuthContext"
import { useMobileView } from "@/app/context/MobileContext"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/app/schemas/schemas"

export const LoginController = () => {
    const { login } = useAuth()
    const { isMobile } = useMobileView()

    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
    
    const loginUser = async (data: LoginFormData) => {
        const { email, password } = data
        const res = await login(email, password)
        if (res == "Invalid login credentials") {
            setError("El usuario o la contraseña son incorrectos")
            setTimeout(() => setError(null), 4000)
            return;
        }
        reset()
    }

    return (
        <LoginView 
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            error={error}
            isSubmitting={isSubmitting}
            loginUser={loginUser}
            isMobile={isMobile}
        />
    )
}