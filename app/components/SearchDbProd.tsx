

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { ProductDB } from "../types/types"

export const SearchDbProd = () => {
    const [id, setId] = useState<string | null>(null)
    const [prod, setProd] = useState<ProductDB>()
    const [stock, setStock] = useState<number | null>(null)

    const searchProd = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            console.log('error', error)
            return
        }
        
        setProd(data)
    }

    const updateProd = async () => {
        const { error } = await supabase
            .from('products')
            .update({ stock: stock })
            .eq('id', id)

        if (error) {
            console.log('error', error)
            return
        }

        alert('Stock actualizado')
        setProd(undefined)
        setId(null)
        setStock(null)
    }

    return (
        <div className="w-[80%] mx-auto h-[50vh]">
            <h1 className="text-center text-4xl">Modificar stock de producto</h1>
            <section className="flex gap-24 mt-20 justify-center text-zinc-500">    
                <div>
                    <label className="flex flex-col gap-3 text-xl">
                        Ingresar ID de producto
                        <input 
                            placeholder="ID de producto"
                            value={id || ''}
                            onChange={(e) => setId(e.target.value)}
                            className="border border-zinc-300 p-2 rounded-lg w-[350px]"
                            type="text" 
                        />
                    </label>
                    <button
                        onClick={searchProd} 
                        className="bg-zinc-700 w-[200px] hover:text-white py-2 rounded-lg text-zinc-200 mt-10">
                        Buscar producto
                    </button>
                </div>
                {prod && (
                    <div className="flex flex-col gap-5">
                        <p>Stock actual: <span className="text-lg text-zinc-800">{prod?.stock}</span></p>
                        <p className="flex items-center gap-4">Nuevo Stock: 
                            <input 
                                value={stock || ''}
                                onChange={(e) => setStock(parseInt(e.target.value))}
                                placeholder="Nuevo stock"
                                className="text-lg text-zinc-800 border border-zinc-200 bg-zinc-100 px-2 py-1 rounded-lg w-[200px]"
                            ></input>
                        </p>
                        <button
                            onClick={updateProd} 
                            className="bg-zinc-700 w-[200px] hover:text-white py-2 rounded-lg text-zinc-200 mt-5">
                            Actualizar stock
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}