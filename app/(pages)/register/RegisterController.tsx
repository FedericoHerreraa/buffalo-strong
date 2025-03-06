'use client'

import { RegisterView } from "./RegisterView";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/app/schemas/schemas";
import { useState } from "react";
import { toast } from 'sonner';

export const RegisterController = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    if (data.cuit !== data.cuit2) {
      setError("Los CUIT no coinciden");
      setTimeout(() => setError(null), 4000)
      return;
    }

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
        setError(`Error enviando email: ${result.error}`);
        setTimeout(() => setError(null), 4000)
      } else {
        console.log("Correo enviado con éxito:", result.data);

        toast.custom((t) => {
          setTimeout(() => toast.dismiss(t), 5000); 
          return <div className="p-3 bg-zinc-900 border border-zinc-600 text-white rounded-md">Registro existoso, revise su correo electronico!</div>;
        });
        
      }
      reset()
    } catch (error) {
      reset()
      setError(`Error en la solicitud: ${error}`);
      setTimeout(() => setError(null), 4000)
    }
  };


  return (
    <RegisterView
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      error={error}
      isSubmitting={isSubmitting}
    />
  )
}