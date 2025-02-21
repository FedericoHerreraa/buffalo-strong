
'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import imagen from '@/app/images/carousel/carouselImage2.webp'

import { merriweather } from "@/app/fonts/fonts";
import { ContactFormData, contactSchema } from "@/app/schemas/schemas";

export const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        console.log("Datos enviados:", data);
        alert("Mensaje enviado con éxito");
        reset();
    };
    return (
        <div className="flex flex-col h-[100vh] items-center ">
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
                        <h1 className={`text-3xl md:text-4xl mb-3 text-[#5a4632] ${merriweather.className}`}>
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

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#5a4632] text-white py-3 px-6 rounded-md hover:bg-[#4a3928] disabled:bg-gray-400 transition-all"
                        >
                            {isSubmitting ? "Enviando..." : "Enviar"}
                        </button>
                    </form>
                    <p className="text-zinc-600 mt-4">** Este mensaje se enviará al Mail de Buffalo Strong. Atención al cliente</p>
                </div>
            </section>
        </div>
    )
}