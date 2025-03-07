import { CustomSeparator } from "@/app/components/CustomSeparator"
import { TitleSection } from "@/app/components/reusable/titleSection"

export const NewsComponent = () => {
    return (
        <div className="flex flex-col min-h-[100vh] items-center mt-10 mb-20">
            <TitleSection title="Noticias" description="Enterate de las ultimas noticias" color="from-amber-700 to-zinc-700" colorDescription="text-zinc-600"/>

            <section className="mt-20 w-full">
                <div className="bg-zinc-50 w-full min-h-[40vh] p-10">
                    <h1 className="font-semibold text-2xl text-zinc-700 border-b border-b-zinc-300 pb-2">Nuestros Productos</h1>
                    <div className="flex justify-between gap-10 items-center mt-10">
                        <div className="bg-gradient-to-br from-amber-500 to-zinc-400 w-1/3 rounded-lg">
                            <div className="bg-white h-40 rounded-md p-5 m-[2px]">
                                <p>Aca iria alguna notica</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-500 to-zinc-400 w-1/3 rounded-lg">
                            <div className="bg-white h-40 rounded-md p-5 m-[2px]">
                                <p>Aca iria alguna notica</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-500 to-zinc-400 w-1/3 rounded-lg">
                            <div className="bg-white h-40 rounded-md p-5 m-[2px]">
                                <p>Aca iria alguna notica</p>
                            </div>
                        </div>
                    </div>
                </div>

                <CustomSeparator />

                <div className="bg-zinc-50 w-full min-h-[40vh] p-10">
                    <h1 className="font-semibold text-2xl text-zinc-700 border-b border-b-zinc-300 pb-2">Nuestro Negocio</h1>
                    <div className="flex justify-between gap-10 items-center mt-10">
                        <div className="bg-gradient-to-br from-amber-500 to-zinc-400 w-1/3 rounded-lg">
                            <div className="bg-white h-40 rounded-md p-5 m-[2px]">
                                <p>Aca iria alguna notica</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-500 to-zinc-400 w-1/3 rounded-lg">
                            <div className="bg-white h-40 rounded-md p-5 m-[2px]">
                                <p>Aca iria alguna notica</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-500 to-zinc-400 w-1/3 rounded-lg">
                            <div className="bg-white h-40 rounded-md p-5 m-[2px]">
                                <p>Aca iria alguna notica</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}