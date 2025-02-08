
import Image from "next/image"
import prod from '@/app/images/products/prod.jpg'

export const Products = () => {
    return (
        <div className="min-h-[100vh]">
            <h1 className="text-center text-5xl mb-1">Nuestros Productos</h1>
            <p className="text-center text-zinc-400">Descubri nuestra magia.</p>

            <section className="flex justify-center mt-20">
                <div className="w-[350px] text-center shadow-lg p-5 rounded-2xl hover:scale-105 transition-all duration-150 cursor-pointer">
                    <h2>Producto 1</h2>
                    <Image 
                        src={prod}
                        alt="Producto 1"
                        width={300}
                        height={300}
                    />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ad quia praesentium commodi asperiores voluptatem voluptatibus quis recusandae id placeat, ab quibusdam earum quisquam quam facere temporibus molestiae? Quidem, necessitatibus?</p>
                </div>
            </section>
        </div>
    )
}