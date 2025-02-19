'use client'

import { LoginView } from "./LoginView"
import { useAuth } from "@/app/context/AuthContext"
import { useMobileView } from "@/app/context/MobileContext"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/app/schemas/schemas"

export const LoginController = () => {
    const { login } = useAuth()
    const { isMobile } = useMobileView()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
    
    const loginUser = async (data: LoginFormData) => {
        const { email, password } = data
        await login(email, password)
        reset()
        
    }

    return (
        <LoginView 
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            loginUser={loginUser}
            isMobile={isMobile}
        />
    )
}