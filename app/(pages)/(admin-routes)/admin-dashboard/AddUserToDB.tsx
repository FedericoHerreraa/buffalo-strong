
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";


import { zodResolver } from "@hookform/resolvers/zod";
import { SendUserCredentials } from "@/app/components/SendUserCredentials";
import { Spinner } from "@/app/images/icons/Spinner";

import { useAuth } from "@/app/context/AuthContext";
import { FaUser } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

import {
    RegisterAdminFormData,
    registerAdminSchema,
} from "@/app/schemas/schemas";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";



export const AddUserToDB = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<RegisterAdminFormData>({
        resolver: zodResolver(registerAdminSchema),
    });
    const { createUser } = useAuth();

    const [showNext, setShowNext] = useState(false);
    const [formInfo, setFormInfo] = useState<RegisterAdminFormData>();
    const [error, setError] = useState<string | null>(null);

    const addUser = async (data: RegisterAdminFormData) => {
        setFormInfo(data);

        const res = await createUser(
            data.email,
            data.name,
            data.password,
            parseInt(data.cuit),
            data.address,
            data.role
        );

        if (res === "A user with this email address has already been registered") {
            setError("Ya existe un usuario con este correo electrónico");
            setTimeout(() => setError(null), 4000);
            return;
        }

        setShowNext(true);
        reset();
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                <div className="xl:col-span-7">
                    <div className="bg-white rounded-xl shadow-lg border border-zinc-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-zinc-50 to-zinc-100 px-6 py-4 border-b border-zinc-200">
                            <h2 className="text-xl font-semibold text-zinc-800">
                                Nuevo Usuario
                            </h2>
                            <p className="text-zinc-600 text-sm mt-1">
                                Completa los datos para crear un nuevo usuario en el
                                sistema
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(addUser)} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                                        Nombre completo *
                                    </label>
                                    <input
                                        {...register("name")}
                                        placeholder="Ingrese el nombre completo"
                                        type="text"
                                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span className="text-red-500">⚠</span>
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                                        Correo electrónico *
                                    </label>
                                    <input
                                        {...register("email")}
                                        placeholder="usuario@ejemplo.com"
                                        type="email"
                                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span className="text-red-500">⚠</span>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                                        Contraseña *
                                    </label>
                                    <input
                                        {...register("password")}
                                        placeholder="Contraseña segura"
                                        type="password"
                                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span className="text-red-500">⚠</span>
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                                        CUIT *
                                    </label>
                                    <input
                                        {...register("cuit")}
                                        placeholder="20-12345678-9"
                                        type="text"
                                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                                    />
                                    {errors.cuit && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span className="text-red-500">⚠</span>
                                            {errors.cuit.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                                        Dirección *
                                    </label>
                                    <input
                                        {...register("address")}
                                        placeholder="Calle 123"
                                        type="text"
                                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span className="text-red-500">⚠</span>
                                            {errors.address.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                                        Rol de usuario *
                                    </label>
                                    <Controller
                                        name="role"
                                        control={control}
                                        defaultValue="Cliente"
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full px-4 py-3 border border-zinc-300 rounded-lg bg-zinc-50 focus:bg-white">
                                                    <SelectValue placeholder="Seleccione un rol" />
                                                </SelectTrigger>
                                                <SelectContent className="border-zinc-300 bg-white">
                                                    <SelectItem
                                                        value="Cliente"
                                                        className="cursor-pointer hover:bg-zinc-50"
                                                    >
                                                        👤 Cliente
                                                    </SelectItem>
                                                    <SelectItem
                                                        value="Admin"
                                                        className="cursor-pointer hover:bg-zinc-50"
                                                    >
                                                        🛠️ Administrador
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                                    <span className="text-red-500">⚠</span>
                                    {error}
                                </div>
                            )}

                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-zinc-700 hover:bg-zinc-800 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 min-w-[160px] justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Spinner />
                                            <span>Creando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaUser size={16} />
                                            <span>Crear Usuario</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="xl:col-span-1 flex items-center justify-center">
                    <div className="bg-zinc-100 rounded-full p-4">
                        <FaArrowRightLong
                            size={24}
                            className="text-zinc-600 xl:rotate-0 rotate-90"
                        />
                    </div>
                </div>

                <div className="xl:col-span-4">
                    {showNext ? (
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-4 border-b border-green-200">
                                <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                                    <span className="text-green-600">✅</span>
                                    Usuario Creado
                                </h3>
                                <p className="text-green-700 text-sm mt-1">
                                    Envía las credenciales al nuevo usuario
                                </p>
                            </div>
                            <div className="p-6">
                                {formInfo && (
                                    <SendUserCredentials
                                        formInfo={formInfo}
                                        setShowNext={setShowNext}
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-300 p-8 text-center h-full flex flex-col justify-center">
                            <div className="text-zinc-400 mb-4">
                                <svg
                                    className="mx-auto h-16 w-16"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-zinc-600 mb-2">
                                Envío de Credenciales
                            </h3>
                            <p className="text-zinc-500 text-sm">
                                Una vez creado el usuario, aquí podrás enviar las
                                credenciales por correo electrónico
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};