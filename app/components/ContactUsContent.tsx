"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Image from "next/image";
import imagen from '@/app/images/carousel/carouselImage2.webp'

import { merriweather } from "../fonts/fonts";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Debe ser un email válido"),
  subject: z.string().min(3, "El asunto debe tener al menos 3 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactUsContent = () => {
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
    <section className="flex h-screen w-full">

      <div className="w-2/5 h-full relative">
        <Image 
            src={imagen}
            alt="Imagen Eko"
            fill
            objectFit="cover"
        />
      </div>

      <div className="w-3/5 flex flex-col py-8 px-12 ">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
          <h1 className={`text-4xl mb-3 text-[#5a4632] ${merriweather.className}`}>Contactanos Ahora Mismo</h1>
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
        <p className="text-zinc-600">** Este mensaje se enviará al Mail de Buffalo Strong. Atención al cliente</p>
      </div>
    </section>
  );
};
