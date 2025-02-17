import { RegisterViewProps } from "@/app/types/types";


export const RegisterView: React.FC<RegisterViewProps> = ({
    formData,
    loading,
    handleChange,
    handleSubmit,
}) => {
    return (
        <div className="w-[80%] h-[80vh] mx-auto mt-20">
            <h1 className="text-4xl">Registra tu nueva cuenta</h1>
            <p className="text-zinc-400">En esta seccion va poder registrar su nueva cuenta como mayorista, ingresando los siguientes datos:</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-20 w-full mt-10 py-10">
                <div className="flex gap-20">
                    <div className="flex flex-col gap-5 w-[350px]">
                        <label className="flex flex-col gap-1 text-zinc-600">
                            Ingrese su nombre
                            <input 
                                type="text" 
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="border border-zinc-300 px-5 py-2 rounded-xl"
                                placeholder="Nombre"
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-zinc-600">
                            Ingrese su apellido
                            <input 
                                type="text" 
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="border border-zinc-300 px-5 py-2 rounded-xl"
                                placeholder="Apellido"
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-zinc-600">
                            Ingrese su correo electronico
                            <input 
                                type="email" 
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-zinc-300 px-5 py-2 rounded-xl"
                                placeholder="Correo Electronico"
                            />
                        </label>
                    </div>
                    <div className="flex flex-col gap-5 w-[350px]">
                        <label className="flex flex-col gap-1 text-zinc-600">
                            Ingrese la direccion
                            <input 
                                type="text" 
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                className="border border-zinc-300 px-5 py-2 rounded-xl"
                                placeholder="Direccion"
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-zinc-600">
                            Ingrese su clave fiscal / CUIT
                            <input 
                                type="number" 
                                name="fiscalKey"
                                required
                                value={formData.fiscalKey}
                                onChange={handleChange}
                                className="border border-zinc-300 px-5 py-2 rounded-xl"
                                placeholder="Clave Fiscal / CUIT"
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-zinc-600">
                            Ingrese de nuevo su clave fiscal / CUIT
                            <input 
                                type="number" 
                                name="fiscalKeyRepeat"
                                required
                                value={formData.fiscalKeyRepeat}
                                onChange={handleChange}
                                className="border border-zinc-300 px-5 py-2 rounded-xl"
                                placeholder="Repita su Clave Fiscal / CUIT"
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <p className="text-zinc-500 mb-2 mr-40">Una vez registrado, nuestro equipo procesara la solicitud y te enviara tus credenciales a la direccion de email ingresada previamente. Maximo estimado para el envio de credenciales de 48hs</p>
                    <button type="submit" className="bg-gray-500 px-5 py-2 rounded-md w-fit flex justify-center text-zinc-200 hover:scale-105 hover:text-white transition-all duration-200">
                        <p className="">{loading ? 'Registrando...' : 'Registrarse'}</p>
                    </button>
                </div>
            </form>
        </div>
    );
}