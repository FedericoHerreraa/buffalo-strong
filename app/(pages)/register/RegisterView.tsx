import { RegisterViewProps } from "@/app/types/types";
import { open_sans } from "@/app/fonts/fonts";
import { Spinner } from "@/app/images/icons/Spinner";

export const RegisterView: React.FC<RegisterViewProps> = ({
    register,
    handleSubmit,
    onSubmit,
    error,
    errors,
    isSubmitting
}) => {
    return (
        <div className={`md:w-[80%] w-[90%] min-h-[80vh] mx-auto mt-20 ${open_sans.className}`}>
            <h1 className="md:text-4xl text-3xl">Registra tu nueva cuenta</h1>
            <p className="text-zinc-400 md:text-base text-sm">En esta seccion vas poder registrar su nueva cuenta como mayorista, ingresando los siguientes datos:</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-20 w-full mt-10 py-10">
                <div className="flex md:flex-row flex-col gap-20">
                    <div className="flex flex-col gap-5 w-[350px]">
                        <label className="flex flex-col gap-1 text-zinc-600">
                            Ingrese su nombre
                            <input 
                                type="text" 
                                required
                                {...register("name")}
                                className="border border-zinc-300 px-5 py-2 rounded-xl"
                                placeholder="Nombre"
                            />
                        </label>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        <label className="flex flex-col gap-1 text-zinc-600">
                            Ingrese su apellido
                            <input 
                                type="text" 
                                required
                                {...register("lastName")}
                                className="border border-zinc-300 px-5 py-2 rounded-xl"
                                placeholder="Apellido"
                            />
                        </label>
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                        <label className="flex flex-col gap-1 text-zinc-600">
                            Ingrese su correo electronico
                            <input 
                                type="email" 
                                required
                                {...register("email")}
                                className="border border-zinc-300 px-5 py-2 rounded-xl"
                                placeholder="Correo Electronico"
                            />
                        </label>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col gap-5 w-[350px]">
                        <label className="flex flex-col gap-1 text-zinc-600">
                            Ingrese la direccion
                            <input 
                                type="text" 
                                required
                                {...register("address")}
                                className="border border-zinc-300 px-5 py-2 rounded-xl"
                                placeholder="Direccion"
                            />
                        </label>
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                        <label className="flex flex-col gap-1 text-zinc-600">
                            Ingrese su clave fiscal / CUIT
                            <input 
                                type="text" 
                                required
                                {...register("cuit")}
                                className="border border-zinc-300 px-5 py-2 rounded-xl"
                                placeholder="Clave Fiscal / CUIT"
                            />
                        </label>
                        {errors.cuit && <p className="text-red-500 text-sm mt-1">{errors.cuit.message}</p>}
                        <label className="flex flex-col gap-1 text-zinc-600">
                            Ingrese de nuevo su clave fiscal / CUIT
                            <input 
                                type="text" 
                                required
                                {...register("cuit2")}
                                className="border border-zinc-300 px-5 py-2 rounded-xl"
                                placeholder="Repita su Clave Fiscal / CUIT"
                            />
                        </label>
                        {errors.cuit2 && <p className="text-red-500 text-sm mt-1">{errors.cuit2.message}</p>}
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                    <p className="text-zinc-500 mb-2 md:mr-40">Una vez registrado, nuestro equipo procesara la solicitud y te enviara tus credenciales a la direccion de email ingresada previamente. Maximo estimado para el envio de credenciales de 48hs</p>
                    <button type="submit" className="bg-gray-500 px-5 py-2 rounded-md w-fit flex justify-center text-zinc-200 hover:scale-105 hover:text-white transition-all duration-200">
                        <p className="">{isSubmitting ? <Spinner /> : 'Registrarse'}</p>
                    </button>
                </div>
            </form>
        </div>
    );
}