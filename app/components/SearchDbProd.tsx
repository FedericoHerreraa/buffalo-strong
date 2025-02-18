
import Image from "next/image"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { ProductDB } from "../types/types"
import { merriweather_sans } from "../fonts/fonts"

export const SearchDbProd = () => {
    const [listCode, setListCode] = useState<string | null>(null)
    const [prod, setProd] = useState<ProductDB>()
    const [stock, setStock] = useState<number | null>(null)

    const searchProd = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('listCode', listCode)
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
            .eq('listCode', listCode)

        if (error) {
            console.log('error', error)
            return
        }

        alert('Stock actualizado')
        setProd(undefined)
        setListCode(null)
        setStock(null)
    }

    return (
        <div className="w-[80%] mx-auto h-[80vh]">
            <h1 className={`text-center text-[#301803] text-4xl ${merriweather_sans.className}`}>Modificar stock de producto</h1>
            <section className="flex gap-24 mt-20 justify-center text-[#301803]">    
                <div>
                    <label className="flex flex-col gap-3 text-xl text-[#301803]">
                        Ingresar codigo de producto
                        <input 
                            placeholder="Codigo de producto"
                            value={listCode || ''}
                            onChange={(e) => setListCode(e.target.value)}
                            className="border border-zinc-300 p-2 rounded-lg w-[350px]"
                            type="text" 
                        />
                    </label>
                    <button
                        onClick={searchProd} 
                        className="bg-[#301803] w-[200px] hover:bg-[#59381b] hover:text-white py-2 rounded-lg text-zinc-200 mt-10">
                        Buscar producto
                    </button>
                </div>
                {prod && (
                    <div className="flex flex-col gap-5 bg-[#dddddd] p-6">
                        <div className="flex gap-5 w-full justify-between">
                            <h3 className="w-40" >Producto: <span className="font-bold text-[#2e1702f7]"> {prod.title}</span></h3> 
                            <Image alt="img" src={prod.img[0]} width={200} height={200}/>
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