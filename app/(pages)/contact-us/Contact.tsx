
'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import imagen from '@/app/images/carousel/carouselImage2.webp'

import { merriweather_sans } from "@/app/fonts/fonts";
import { ContactFormData, contactSchema } from "@/app/schemas/schemas";
import { Spinner } from "@/app/images/icons/Spinner";

export const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: ContactFormData) => {
        try {
            const res = await fetch('/api/send-contact-email', {
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
            }
        } catch {

        }
        reset();
    };

    return (
        <div className="flex flex-col min-h-[100vh] items-center ">
            <section className="flex flex-col md:flex-row h-auto md:h-screen w-full">
                <div className="w-full md:w-2/5 h-64 md:h-full relative">
                    <Image
                        src={imagen}
                        alt="Imagen Eko"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="w-full md:w-3/5 flex flex-col py-8 px-6 md:px-12">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <h1 className={`text-3xl font-semibold md:text-4xl mb-3 bg-gradient-to-r from-amber-700 to-zinc-700 bg-clip-text text-transparent ${merriweather_sans.className}`}>
                            Contactanos Ahora Mismo
                        </h1>

                        <div>
                            <label className="block text-sm font-medium text-[#5a4632]">Nombre</label>
                            <input
                                type="text"
                                {...register("name")}
                                className="w-full p-3 border border-[#d2b48c] rounded-md bg-white focus:ring focus:ring-[#a67c52] focus:border-[#a67c52]"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#5a4632]">Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                className="w-full p-3 border border-[#d2b48c] rounded-md bg-white focus:ring focus:ring-[#a67c52] focus:border-[#a67c52]"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#5a4632]">Asunto</label>
                            <input
                                type="text"
                                {...register("subject")}
                                className="w-full p-3 border border-[#d2b48c] rounded-md bg-white focus:ring focus:ring-[#a67c52] focus:border-[#a67c52]"
                            />
                            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#5a4632]">Mensaje</label>
                            <textarea
                                rows={4}
                                {...register("message")}
                                className="w-full p-3 border border-[#d2b48c] rounded-md bg-white focus:ring focus:ring-[#a67c52] focus:border-[#a67c52]"
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                        </div>
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#5a4632] text-white py-3 px-6 rounded-md hover:bg-[#4a3928] disabled:bg-gray-400 transition-all"
                        >
                            {isSubmitting ? <Spinner /> : "Enviar"}
                        </button>
                    </form>
                    <p className="text-zinc-600 mt-4">** Este mensaje se enviará al Mail de Buffalo Strong. Atención al cliente</p>
                </div>
            </section>
        </div>
    )
}