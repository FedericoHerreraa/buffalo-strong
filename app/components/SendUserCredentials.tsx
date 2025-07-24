import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { FaEnvelope, FaKey, FaUser, FaPaperPlane } from "react-icons/fa6";
import {
  RegisterAdminFormData,
  SendRegisterEmailData,
  sendRegisterEmailSchema,
} from "@/app/schemas/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/app/images/icons/Spinner";

export const SendUserCredentials = ({
  formInfo,
  setShowNext,
}: {
  formInfo: RegisterAdminFormData;
  setShowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SendRegisterEmailData>({
    resolver: zodResolver(sendRegisterEmailSchema),
  });

  const [emailCopied, setEmailCopied] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    if (text.includes("@")) setEmailCopied(true);
    else setPasswordCopied(true);

    setTimeout(() => {
      if (text.includes("@")) setEmailCopied(false);
      else setPasswordCopied(false);
    }, 3000);
  };

  const sendEmail = async (data: SendRegisterEmailData) => {
    const res = await fetch("/api/send-credentials-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      console.log("Correo enviado con éxito:", result.data);
    }

    setShowNext(false);
    reset();
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit(sendEmail)} className="space-y-6">
        {/* Información del usuario creado */}
        <div className="bg-white rounded-lg border border-green-200 p-4">
          <h4 className="text-sm font-medium text-green-800 mb-3 flex items-center gap-2">
            <FaUser size={14} />
            Credenciales del Usuario
          </h4>
          <div className="space-y-3">
            {/* Email */}
            <div className="flex items-center justify-between bg-green-50 rounded-lg p-3 border border-green-100">
              <div className="flex items-center gap-3">
                <FaEnvelope size={14} className="text-green-600" />
                <div>
                  <p className="text-xs text-green-600 font-medium">Email</p>
                  <p className="text-sm text-green-800 font-mono">
                    {formInfo.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(formInfo.email)}
                className="p-2 rounded-lg hover:bg-green-100 transition-colors"
              >
                {emailCopied ? (
                  <IoMdCheckmark className="text-green-600 text-lg" />
                ) : (
                  <IoCopyOutline className="text-green-600 text-lg" />
                )}
              </button>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between bg-green-50 rounded-lg p-3 border border-green-100">
              <div className="flex items-center gap-3">
                <FaKey size={14} className="text-green-600" />
                <div>
                  <p className="text-xs text-green-600 font-medium">
                    Contraseña
                  </p>
                  <p className="text-sm text-green-800 font-mono">
                    {formInfo.password}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(formInfo.password)}
                className="p-2 rounded-lg hover:bg-green-100 transition-colors"
              >
                {passwordCopied ? (
                  <IoMdCheckmark className="text-green-600 text-lg" />
                ) : (
                  <IoCopyOutline className="text-green-600 text-lg" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Formulario de email */}
        <div className="space-y-4">
          {/* Destinatario */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Destinatario *
            </label>
            <input
              {...register("to")}
              placeholder="correo@usuario.com"
              type="email"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
            />
            {errors.to && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {errors.to.message}
              </p>
            )}
          </div>

          {/* Asunto */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Asunto *
            </label>
            <input
              {...register("subject")}
              placeholder="Bienvenido - Credenciales de acceso"
              type="text"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Cuerpo del mensaje */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Mensaje *
            </label>
            <textarea
              {...register("body")}
              rows={4}
              placeholder="Escribe el mensaje que se enviará al usuario..."
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white resize-none"
            />
            {errors.body && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {errors.body.message}
              </p>
            )}
          </div>
        </div>

        {/* Botón de envío */}
        <div className="flex justify-end pt-4 border-t border-green-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 min-w-[140px] justify-center"
          >
            {isSubmitting ? (
              <>
                <Spinner />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <FaPaperPlane size={16} />
                <span>Enviar Email</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
