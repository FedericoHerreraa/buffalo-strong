'use client'

import { useState } from "react"
import { FaArrowRightLong } from "react-icons/fa6";
import { useAuth } from "@/app/context/AuthContext";
import { CustomSeparator } from "./CustomSeparator";
import { SearchDbProd } from "./SearchDbProd";
import { SendUserCredentials } from "./SendUserCredentials";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterAdminFormData, registerAdminSchema } from "@/app/schemas/schemas";

export const AdminDashboardComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<RegisterAdminFormData>({ resolver: zodResolver(registerAdminSchema) });

    const [showNext, setShowNext] = useState(false)
    const [formInfo, setFormInfo] = useState<RegisterAdminFormData>()
    const { registerUser, logOut } = useAuth()

    const addUser = async (data: RegisterAdminFormData) => {
        setFormInfo(data)
        await registerUser(data.email, data.name, data.password, parseInt(data.cuit), data.address)
        await logOut()
        setShowNext(true)
        reset()
    }

    return (
        <div className="min-h-[100vh]">
            <div className="flex justify-center mt-10">
                <h1 className="text-4xl mb-3">Administrador de Buffalo{"'"}s</h1>
            </div>
            <section className="flex justify-between items-center w-[80%] mx-auto mt-20 ">
                <form onSubmit={handleSubmit(addUser)} className="w-1/3 flex flex-col gap-5">
                    <h2 className="text-2xl font-semibold">Agregar usuario a la Base de Datos</h2>
                    <div className="w-[400px]">
                        <label htmlFor="email" className="text-zinc-700 ml-1">Ingrese el nombre completo</label>
                        <input 
                            {...register("name")}
                            placeholder="nombre completo"
                            type="text" 
                            className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    <div className="w-[400px]">
                        <label htmlFor="email" className="text-zinc-700 ml-1">Ingrese el correo electrónico</label>
                        <input 
                            {...register("email")}
                            placeholder="tu@servicio.com"
                            type="email" 
                            className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    <div className="w-[400px]">
                        <label htmlFor="password" className="text-zinc-700 ml-1">Ingrese la contraseña</label>
                        <input 
                            placeholder="clave"
                            {...register("password")}
                            type="password" 
                            className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    <div className="w-[400px]">
                        <label className="text-zinc-700 ml-1">Ingrese la Clave Fiscal</label>
                        <input 
                            placeholder="CUIT"
                            {...register("cuit")}
                            type="number" 
                            className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    {errors.cuit && <p className="text-red-500 text-sm mt-1">{errors.cuit.message}</p>}
                    <div className="w-[400px]">
                        <label className="text-zinc-700 ml-1">Ingrese la direccion</label>
                        <input 
                            placeholder="direccion"
                            {...register("address")}
                            type="text" 
                            className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    <button
                        type="submit"
                        className="bg-zinc-700 w-[200px] hover:text-white py-2 rounded-lg text-zinc-200"
                    >
                        {isSubmitting ? 'Agregando...' : 'Agregar usuario'}
                    </button>
                </form>
                <FaArrowRightLong size={30} className="w-1/3"/>
                {showNext ? (
                    <>
                        {formInfo && <SendUserCredentials formInfo={formInfo} setShowNext={setShowNext}/>}
                    </>
                ) : (
                    <div className="w-1/3"></div>
                )}
            </section>

            <CustomSeparator />

            <section>
                <SearchDbProd />
            </section>
        </div>
    )
}