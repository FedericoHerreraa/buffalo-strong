'use client'

import { useState } from "react"
// import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAuth } from "@/app/context/AuthContext";
import { CustomSeparator } from "./CustomSeparator";
import { SearchDbProd } from "./SearchDbProd";

export const AdminDashboardComponent = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        cuit: "",
        address: ""
    })
    const [email, setEmail] = useState({
        to: "",
        subject: "",
        body: ""
    })


    const [showNext, setShowNext] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    };

    const { register } = useAuth()
    // const router = useRouter()

    // if (!user || user.role !== 'admin') router.push('/')

    const addUser = async () => {
        setLoading(true)
        await register(form.email, form.name, form.password, parseInt(form.cuit), form.address)
        setShowNext(true)
        setLoading(false)
    }

    // const sendEmail = () => {
    //     // send email logic
    // }

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
                        {loading ? 'Agregando' : 'Agregar usuario'}
                    </button>
                </form>
                {showNext && (
                    <>
                        <FaArrowRightLong size={30} className="w-1/3"/>
                        <div className="w-1/3">
                            <h2 className="text-2xl font-semibold mb-5">Enviar credenciales por email al usuario</h2>
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label htmlFor="email" className="text-zinc-700 ml-1">Para</label>
                                    <input 
                                        value={email.to}
                                        onChange={handleEmailChange}
                                        placeholder="nombre@servicio.com"
                                        type="email" 
                                        name="to"
                                        className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-zinc-700 ml-1">Asunto</label>
                                    <input 
                                        value={email.subject}
                                        onChange={handleEmailChange}
                                        placeholder="Mensaje de bienvenida"
                                        type="email" 
                                        name="subject"
                                        className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none" 
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-zinc-700 ml-1">Cuerpo del mensaje</label>
                                    <textarea 
                                        value={email.body}
                                        onChange={handleEmailChange}
                                        className="bg-zinc-100 rounded-lg"
                                        name="body"
                                        rows={5}
                                        cols={30}
                                    />                    
                                </div>
                                <button 
                                    type="button"
                                    className="bg-zinc-700 w-[200px] hover:text-white py-2 rounded-lg text-zinc-200">
                                    Enviar email
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </section>
            <CustomSeparator />

            <section>
                <SearchDbProd />
            </section>
        </div>
    )
}