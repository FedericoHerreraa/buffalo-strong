'use client'

import { RegisterView } from "./RegisterView";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/app/schemas/schemas";


export const RegisterController = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const res = await fetch('/api/send-register-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
      
            const result = await res.json();
            if (!result.success) {
              console.error("Error enviando email:", result.error);
            } else {
              console.log("Correo enviado con éxito:", result.data);
            }
            reset()
        } catch (error) {
            reset()
            console.error("Error en la solicitud:", error);
        }
    };


    return (
        <RegisterView 
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
        />
    )
}