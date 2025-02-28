
import Image from "next/image"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { ProductDB } from "@/app/types/types"
import { merriweather_sans } from "@/app/fonts/fonts"

export const SearchDbProd = () => {
    const [listCode, setListCode] = useState<string | null>(null)
    const [prod, setProd] = useState<ProductDB>()
    const [stock, setStock] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    const searchProd = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('listCode', listCode)
            .single()

        if (error) {
            setError('Error al buscar producto (puede ser que el id no sea correcto)')
            setTimeout(() => setError(null), 4000)
            return
        }
        
        setProd(data)
    }

    const updateProd = async () => {
        const { error } = await supabase
            .from('products')
            .update({ stock: stock })
            .eq('listCode', listCode)

        if (error) {
            setError('Error al actualizar stock')
            setTimeout(() => setError(null), 4000)
            return
        }

        alert('Stock actualizado')
        setProd(undefined)
        setListCode(null)
        setStock(null)
    }

    return (
        <div className="md:w-[80%] w-[95%] mx-auto min-h-[60vh] shadow-lg border border-zinc-200 p-10 rounded-md">
            <h1 className={`text-center text-[#301803] md:text-3xl text-2xl ${merriweather_sans.className}`}>Modificar stock de producto</h1>
            <section className="flex md:flex-row flex-col gap-24 mt-20 justify-center text-[#301803]">    
                <div>
                    <label className="flex flex-col gap-3 text-lg text-[#301803]">
                        Ingresar codigo de producto
                        <input 
                            placeholder="Codigo de producto"
                            value={listCode || ''}
                            onChange={(e) => setListCode(e.target.value)}
                            className="border border-zinc-300 p-2 rounded-lg w-[350px]"
                            type="text" 
                        />
                    </label>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    <button
                        onClick={searchProd} 
                        className="bg-[#301803] w-[200px] hover:bg-[#59381b] hover:text-white py-2 rounded-lg text-zinc-200 mt-10">
                        Buscar producto
                    </button>
                </div>
                {prod && (
                    <div className="flex flex-col gap-5 bg-[#dddddd] rounded-md p-6">
                        <div className="flex gap-5 w-full justify-between">
                            <h3 className="w-40" >Producto: <span className="font-bold text-[#2e1702f7]"> {prod.title}</span></h3> 
                            <Image alt="img" className="rounded-md" src={prod.img[0]} width={200} height={200}/>
                        </div>

                        <p>Stock actual: <span className="text-lg font-bold text-[#2e1702f7]">{prod?.stock}</span></p>
                        <p className="flex items-center gap-4">Nuevo Stock: 
                            <input 
                                value={stock || ''}
                                onChange={(e) => setStock(parseInt(e.target.value))}
                                placeholder="Ingrese Nuevo Stock"
                                className="text-lg placeholder:text-[#2e1702b0] border border-[#f8dac5] bg-zinc-100 px-2 py-1 rounded-lg w-[200px]"
                            ></input>
                        </p>
                        <button
                            onClick={updateProd} 
                            className="bg-[#301803] w-[200px] hover:text-white hover:bg-[#59381b] py-2 rounded-lg text-zinc-200 mt-5">
                            Actualizar stock
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}