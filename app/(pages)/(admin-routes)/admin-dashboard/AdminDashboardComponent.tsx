'use client'

import { useState } from "react"
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useAuth } from "@/app/context/AuthContext";
import { SearchDbProd } from "./SearchDbProd";
import { SendUserCredentials } from "@/app/components/SendUserCredentials";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterAdminFormData, registerAdminSchema } from "@/app/schemas/schemas";
import { Spinner } from "@/app/images/icons/Spinner";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import Link from "next/link";

export const AdminDashboardComponent = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<RegisterAdminFormData>({ resolver: zodResolver(registerAdminSchema) });
    const { createUser } = useAuth()

    const [showNext, setShowNext] = useState(false)
    const [formInfo, setFormInfo] = useState<RegisterAdminFormData>()
    const [error, setError] = useState<string | null>(null)

    const addUser = async (data: RegisterAdminFormData) => {
        setFormInfo(data)
        console.log(data.role)

        const res = await createUser(data.email, data.name, data.password, parseInt(data.cuit), data.address, data.role)

        if (res === 'A user with this email address has already been registered') {
            setError('Ya existe un usuario con este correo electrónico')
            setTimeout(() => setError(null), 4000)
            return;
        }

        setShowNext(true)
        reset()
    }

    return (
        <div className="min-h-[100vh]">
            <div className="absolute md:top-5 md:left-5 top-3 left-3 flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                    <FaArrowLeftLong size={20} className="text-zinc-700 hover:text-zinc-900" />
                    <p className="text-zinc-700 hover:text-zinc-900">Volver a la página principal</p>
                </Link>
            </div>
            <div className="flex justify-center mt-14">
                <h1 className="md:text-4xl text-2xl font-bold mb-3 bg-gradient-to-r from-amber-700 to-zinc-700 text-transparent bg-clip-text drop-shadow-md">
                    Administrador de Buffalo&apos;s
                </h1>
            </div>
            <section className="flex md:flex-row flex-col justify-between shadow-lg border border-zinc-200 p-10 rounded-md items-center md:w-[80%] w-[95%] mx-auto md:gap-0 gap-20 mt-20">
                <form onSubmit={handleSubmit(addUser)} className="md:w-1/3 w-[95%] flex flex-col gap-5">
                    <h2 className="text-2xl font-semibold">Agregar usuario a la Base de Datos</h2>
                    <div className="md:w-[400px]">
                        <label htmlFor="email" className="text-zinc-700 ml-1">Ingrese el nombre completo</label>
                        <input
                            {...register("name")}
                            placeholder="nombre completo"
                            type="text"
                            className="w-full mt-2 bg-zinc-100 border border-zinc-300 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none"
                        />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    <div className="md:w-[400px]">
                        <label htmlFor="email" className="text-zinc-700 ml-1">Ingrese el correo electrónico</label>
                        <input
                            {...register("email")}
                            placeholder="tu@servicio.com"
                            type="email"
                            className="w-full mt-2 bg-zinc-100 border border-zinc-300 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    <div className="md:w-[400px]">
                        <label htmlFor="password" className="text-zinc-700 ml-1">Ingrese la contraseña</label>
                        <input
                            placeholder="clave"
                            {...register("password")}
                            type="text"
                            className="w-full mt-2 bg-zinc-100 border border-zinc-300 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none"
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    <div className="md:w-[400px]">
                        <label className="text-zinc-700 ml-1">Ingrese la Clave Fiscal</label>
                        <input
                            placeholder="CUIT"
                            {...register("cuit")}
                            type="number"
                            className="w-full mt-2 bg-zinc-100 border border-zinc-300 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none"
                        />
                    </div>
                    {errors.cuit && <p className="text-red-500 text-sm mt-1">{errors.cuit.message}</p>}
                    <div className="md:w-[400px]">
                        <label className="text-zinc-700 ml-1">Ingrese la direccion</label>
                        <input
                            placeholder="direccion"
                            {...register("address")}
                            type="text"
                            className="w-full mt-2 bg-zinc-100 border border-zinc-300 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none"
                        />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    <div className="md:w-[400px]">
                        <label className="text-zinc-700 ml-1 mb-2">Rol de usuario</label>    
                        <Controller
                            name="role"
                            control={control}
                            defaultValue="Cliente"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-fit p-2 gap-3 border-zinc-300 text-zinc-500">
                                        <SelectValue placeholder="Seleccione un rol" />
                                    </SelectTrigger>
                                    <SelectContent className="p-2 border-zinc-300 bg-white text-zinc-600">
                                        <SelectItem value="Cliente" className="border-none cursor-pointer">
                                            Cliente
                                        </SelectItem>
                                        <SelectItem value="Admin" className="border-none cursor-pointer">
                                            Administrador
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    <button
                        type="submit"
                        className="bg-zinc-700 w-[200px] hover:text-white flex justify-center py-2 rounded-lg text-zinc-200"
                    >
                        {isSubmitting ? <Spinner /> : 'Agregar usuario'}
                    </button>
                </form>
                <FaArrowRightLong size={30} className="w-1/3 md:rotate-0 rotate-90" />
                {showNext ? (
                    <>
                        {formInfo && <SendUserCredentials formInfo={formInfo} setShowNext={setShowNext} />}
                    </>
                ) : (
                    <div className="w-1/3"></div>
                )}
            </section>

            <section className="my-20">
                <SearchDbProd />
            </section>
        </div>
    )
}