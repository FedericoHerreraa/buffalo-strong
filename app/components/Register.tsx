


export const RegisterComponent = () => {
    return (
        <div className="w-[80%] mx-auto mt-20">
            <h1 className="text-4xl">Registra tu nueva cuenta</h1>
            <p className="text-zinc-400">En esta seccion va poder registrar su nueva cuenta como mayorista, ingresando los siguientes datos</p>
            <form className="flex gap-20 w-full mt-20 py-10">
                <div className="flex flex-col gap-5 w-[350px]">
                    <input 
                        type="text" 
                        className="border border-zinc-400 px-5 py-2 rounded-xl"
                        placeholder="Nombre"
                    />
                    <input 
                        type="text" 
                        className="border border-zinc-400 px-5 py-2 rounded-xl"
                        placeholder="Apellido"
                    />
                    <input 
                        type="email" 
                        className="border border-zinc-400 px-5 py-2 rounded-xl"
                        placeholder="Correo Electronico"
                    />
                </div>
                <div className="flex flex-col gap-5 w-[350px]">
                    <input 
                        type="number" 
                        className="border border-zinc-400 px-5 py-2 rounded-xl"
                        placeholder="Clave Fiscal / CUIT"
                    />
                    <input 
                        type="number" 
                        className="border border-zinc-400 px-5 py-2 rounded-xl"
                        placeholder="Repita su Clave Fiscal / CUIT"
                    />
                </div>
            </form>
        </div>
    );
}