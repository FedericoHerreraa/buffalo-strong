
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { RegisterAdminFormData, SendRegisterEmailData, sendRegisterEmailSchema } from "@/app/schemas/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/app/images/icons/Spinner";

export const SendUserCredentials = ({
    formInfo,
    setShowNext
}: {
    formInfo: RegisterAdminFormData;
    setShowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SendRegisterEmailData>({ resolver: zodResolver(sendRegisterEmailSchema) });

    const [emailCopied, setEmailCopied] = useState(false);
    const [passwordCopied, setPasswordCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        if (text.includes('@')) setEmailCopied(true);
        else setPasswordCopied(true);

        setTimeout(() => {
            if (text.includes('@')) setEmailCopied(false);
            else setPasswordCopied(false);
        }, 3000); 
    };

    const sendEmail = async (data: SendRegisterEmailData) => {
        const res = await fetch('/api/send-credentials-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const result = await res.json();
        if (result.success) {
            console.log("Correo enviado con éxito:", result.data);
        }


        setShowNext(false);
        reset();
    }

    return (
        <div className="md:w-1/3 w-[95%]">
            <h2 className="text-2xl font-semibold mb-5">
                Enviar credenciales por email al usuario
            </h2>
            <form onSubmit={handleSubmit(sendEmail)} className="flex flex-col gap-5">
                <div>
                    <label htmlFor="email" className="text-zinc-700 ml-1">
                        Para
                    </label>
                    <input
                        {...register("to")}
                        placeholder="nombre@servicio.com"
                        type="email"
                        className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none"
                    />
                </div>
                {errors.to && <p className="text-red-500 text-sm mt-1">{errors.to.message}</p>}
                <div>
                    <label htmlFor="email" className="text-zinc-700 ml-1">
                        Asunto
                    </label>
                    <input
                        {...register("subject")}
                        placeholder="Mensaje de bienvenida"
                        type="text"
                        className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none"
                    />
                </div>
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <p className="bg-zinc-100 p-2 rounded-lg text-zinc-700 w-fit">
                            {formInfo.email}
                        </p>
                            {emailCopied ? (
                                <IoMdCheckmark className="text-green-500 text-xl" />
                            ) : (
                                <IoCopyOutline
                                    className="cursor-pointer text-xl"
                                    onClick={() => handleCopy(formInfo.email)}
                                />
                            )}
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="bg-zinc-100 p-2 rounded-lg text-zinc-700 w-fit">
                            {formInfo.password}
                        </p>
                        {passwordCopied ? (
                            <IoMdCheckmark className="text-green-500 text-xl" />
                        ) : (
                            <IoCopyOutline
                                className="cursor-pointer text-xl"
                                onClick={() => handleCopy(formInfo.password)}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-zinc-700 ml-1">
                        Cuerpo del mensaje
                    </label>
                    <textarea
                        {...register("body")}
                        className="bg-zinc-100 rounded-lg"
                        rows={5}
                        cols={30}
                    />
                </div>
                {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>}
                <button
                    type="submit"
                    className="bg-zinc-700 w-[200px] flex justify-center hover:text-white py-2 rounded-lg text-zinc-200"
                >
                    {isSubmitting ? <Spinner /> : 'Enviar email'}
                </button>
            </form>
        </div>
    );
};
