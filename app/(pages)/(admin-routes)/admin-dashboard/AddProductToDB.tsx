import { useState } from "react";
import { FaPlus } from "react-icons/fa6"


interface FormState {
    title: string;
    description: string;
    sugestedPrice: number;
    listPrice: number;
    brand: string;
    img: string;
    listCode: string;
    category: string;
    color: string;
    stock: number;
    group: string;
    subcategory: string;
}

export const AddProductToDB = () => {
    const [formState, setFormState] = useState<FormState>({
        title: "",
        description: "",
        sugestedPrice: 0,
        listPrice: 0,
        brand: "",
        stock: 0,
        img: "",
        listCode: "",
        category: "",
        color: "",
        group: "",
        subcategory: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aca validar toda la info que no esta validada en el form

        // Una vez que se valido la info, hacer el fetch a la ruta api de next

        // Esperar la respuesta haciendo un try catch para el manejo de errores
    };

    return (
        <section className="bg-white p-8 rounded-lg shadow-md border border-zinc-200">
            <h2 className="text-2xl font-semibold mb-6">
                Agregar Nuevo Producto
            </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder="Titulo" type="text" name="title" value={formState.title} onChange={handleChange} />
                </div>
            </form>
            <div className="text-center py-12 text-zinc-500">
                <FaPlus size={48} className="mx-auto mb-4 text-zinc-400" />
                <p className="text-lg">Componente para agregar productos</p>
                <p className="text-sm mt-2">
                    Este componente se implementará próximamente
                </p>
            </div>
        </section>
    );
};