'use client'

import { useState } from "react"
import { RegisterView } from "./RegisterView";

export const RegisterController = () => {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        address: "",
        fiscalKey: "",
        fiscalKeyRepeat: ""
    })
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const cleanForm = () => {
        setFormData({
            name: "",
            lastName: "",
            email: "",
            address: "",
            fiscalKey: "",
            fiscalKeyRepeat: ""
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/send-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
      
            const result = await res.json();
            if (!result.success) {
              console.error("Error enviando email:", result.error);
            } else {
              console.log("Correo enviado con éxito:", result.data);
            }
            setLoading(false)
            cleanForm()
        } catch (error) {
            setLoading(false)
            cleanForm()
            console.error("Error en la solicitud:", error);
        }
    };


    return (
        <RegisterView 
            formData={formData}
            loading={loading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )
}