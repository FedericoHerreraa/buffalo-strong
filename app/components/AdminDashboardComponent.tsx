'use client'

import { useState } from "react"
// import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAuth } from "@/app/context/AuthContext";
import { CustomSeparator } from "./CustomSeparator";
import { SearchDbProd } from "./SearchDbProd";
import { SendUserCredentials } from "./SendUserCredentials";

export const AdminDashboardComponent = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        cuit: "",
        address: ""
    })

    const [showNext, setShowNext] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const { register, logOut } = useAuth()
    // const router = useRouter()

    // if (!user || user.role !== 'admin') router.push('/')

    const addUser = async () => {
        setLoading(true)
        await register(form.email, form.name, form.password, parseInt(form.cuit), form.address)
        await logOut()
        setShowNext(true)
        setLoading(false)
    }

    return (
        <div className="min-h-[100vh]">
            <div className="flex justify-center mt-10">
                <h1 className="text-4xl mb-3">Administrador de Buffalo{"'"}s</h1>
            </div>
            <section className="flex justify-between items-center w-[80%] mx-auto mt-20">
                <form className="w-1/3 flex flex-col gap-5">
                    <h2 className="text-2xl font-semibold">Agregar usuario a la Base de Datos</h2>
                    <div className="w-[400px]">
                        <label htmlFor="email" className="text-zinc-700 ml-1">Ingrese el nombre completo</label>
                        <input 
                            value={form.name || ''}
                            name="name"
                            onChange={handleFormChange}
                            placeholder="nombre completo"
                            type="text" 
                            className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    <div className="w-[400px]">
                        <label htmlFor="email" className="text-zinc-700 ml-1">Ingrese el correo electrónico</label>
                        <input 
                            value={form.email}
                            name="email"
                            onChange={handleFormChange}
                            placeholder="tu@servicio.com"
                            type="email" 
                            className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    <div className="w-[400px]">
                        <label htmlFor="password" className="text-zinc-700 ml-1">Ingrese la contraseña</label>
                        <input 
                            placeholder="clave"
                            name="password"
                            value={form.password}
                            onChange={handleFormChange}
                            type="password" 
                            className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    <div className="w-[400px]">
                        <label className="text-zinc-700 ml-1">Ingrese la Clave Fiscal</label>
                        <input 
                            placeholder="CUIT"
                            value={form.cuit}
                            name="cuit"
                            onChange={handleFormChange}
                            type="number" 
                            className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    <div className="w-[400px]">
                        <label className="text-zinc-700 ml-1">Ingrese la direccion</label>
                        <input 
                            placeholder="direccion"
                            value={form.address}
                            name="address"
                            onChange={handleFormChange}
                            type="text" 
                            className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    <button
                        type="button"
                        onClick={addUser} 
                        className="bg-zinc-700 w-[200px] hover:text-white py-2 rounded-lg text-zinc-200"
                    >
                        {loading ? 'Agregando...' : 'Agregar usuario'}
                    </button>
                </form>
                <FaArrowRightLong size={30} className="w-1/3"/>
                {showNext ? (
                    <>
                        <SendUserCredentials form={form} setForm={setForm} setShowNext={setShowNext}/>
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