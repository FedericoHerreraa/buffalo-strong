


export const RegisterComponent = () => {
    return (
        <div className="w-[80%] h-[80vh] mx-auto mt-20">
            <h1 className="text-4xl">Registra tu nueva cuenta</h1>
            <p className="text-zinc-400">En esta seccion va poder registrar su nueva cuenta como mayorista, ingresando los siguientes datos:</p>
            <form className="flex gap-20 w-full mt-10 py-10">
                <div className="flex flex-col gap-5 w-[350px]">
                    <label className="flex flex-col gap-1 text-zinc-600">
                        Ingrese su nombre
                        <input 
                            type="text" 
                            className="border border-zinc-400 px-5 py-2 rounded-xl"
                            placeholder="Nombre"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-zinc-600">
                        Ingrese su apellido
                        <input 
                            type="text" 
                            className="border border-zinc-400 px-5 py-2 rounded-xl"
                            placeholder="Apellido"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-zinc-600">
                        Ingrese su correo electronico
                        <input 
                            type="email" 
                            className="border border-zinc-400 px-5 py-2 rounded-xl"
                            placeholder="Correo Electronico"
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-5 w-[350px]">
                    <label className="flex flex-col gap-1 text-zinc-600">
                        Ingrese su clave fiscal / CUIT
                        <input 
                            type="number" 
                            className="border border-zinc-400 px-5 py-2 rounded-xl"
                            placeholder="Clave Fiscal / CUIT"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-zinc-600">
                        Ingrese de nuevo su clave fiscal / CUIT
                        <input 
                            type="number" 
                            className="border border-zinc-400 px-5 py-2 rounded-xl"
                            placeholder="Repita su Clave Fiscal / CUIT"
                        />
                    </label>
                       
                </div>
            </form>
        </div>
    );
}