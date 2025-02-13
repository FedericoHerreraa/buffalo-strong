'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAuth } from "@/app/context/AuthContext";

export const AdminDashboardComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cuit, setCuit] = useState('')
    const [address, setAddress] = useState('')
    const { register, user } = useAuth()
    const router = useRouter()

    if (!user || user.role !== 'admin') router.push('/')

    const addUser = async () => {
        const user = await register(email, password, parseInt(cuit), address)
        console.log(user)
    }

    return (
        <div className="min-h-[100vh]">
            <div className="flex justify-center mt-10">
                <h1 className="text-4xl mb-3">Dashboard de Administrador</h1>
            </div>
            <div className="flex justify-between items-center w-[80%] mx-auto mt-20">
                <form className="w-1/3 flex flex-col gap-5">
                    <h2 className="text-2xl font-semibold">Agregar usuario a la Base de Datos</h2>
                    <div className="w-[400px]">
                        <label htmlFor="email" className="text-zinc-700 ml-1">Ingrese el correo electrónico</label>
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@servicio.com"
                            type="email" 
                            className="w-full mt-2 bg-zinc-200 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    <div className="w-[400px]">
                        <label htmlFor="password" className="text-zinc-700 ml-1">Ingrese la contraseña</label>
                        <input 
                            placeholder="clave"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            className="w-full mt-2 bg-zinc-200 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    <div className="w-[400px]">
                        <label className="text-zinc-700 ml-1">Ingrese la Clave Fiscal</label>
                        <input 
                            placeholder="CUIT"
                            value={cuit}
                            onChange={(e) => setCuit(e.target.value)}
                            type="number" 
                            className="w-full mt-2 bg-zinc-200 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    <div className="w-[400px]">
                        <label className="text-zinc-700 ml-1">Ingrese la direccion</label>
                        <input 
                            placeholder="direccion"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text" 
                            className="w-full mt-2 bg-zinc-200 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                        />
                    </div>
                    <button
                        onClick={addUser} 
                        className="bg-zinc-700 w-[200px] hover:text-white py-2 rounded-lg text-zinc-200"
                    >
                        Agregar usuario
                    </button>
                </form>
                <FaArrowRightLong size={30} className="w-1/3"/>
                <div className="w-1/3">
                    <h2 className="text-2xl font-semibold mb-5">Enviar credenciales por email al usuario</h2>
                    <div className="flex flex-col gap-5">
                        <div>
                            <label htmlFor="email" className="text-zinc-700 ml-1">Para</label>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nombre@servicio.com"
                                type="email" 
                                className="w-full mt-2 bg-zinc-200 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-zinc-700 ml-1">Asunto</label>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Mensaje de bienvenida"
                                type="email" 
                                className="w-full mt-2 bg-zinc-200 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-zinc-700 ml-1">Cuerpo del mensaje</label>
                            <textarea 
                                defaultValue={email} 
                                className="bg-zinc-200 rounded-lg"
                                rows={5}
                                cols={30}
                            />                    
                        </div>
                        <button className="bg-zinc-700 w-[200px] hover:text-white py-2 rounded-lg text-zinc-200">
                            Enviar email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}