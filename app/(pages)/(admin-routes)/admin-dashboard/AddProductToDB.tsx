import { useState } from "react";
import { FaImage, FaTrash } from "react-icons/fa6"
import Image from "next/image";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";


// interface FormState {
//     title: string;
//     description: string;
//     sugestedPrice: number;
//     listPrice: number;
//     brand: string;
//     img: string;
//     listCode: string;
//     category: string;
//     color: string;
//     stock: number;
//     group: string;
//     subcategory: string;
// }

export const AddProductToDB = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        
        // Limitar a máximo 5 imágenes
        if (files.length > 5) {
            alert('Máximo 5 imágenes permitidas');
            return;
        }

        setSelectedImages(files);
        
        // Crear previews
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeImage = (index: number) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        
        setSelectedImages(newImages);
        setImagePreviews(newPreviews);
    };

    return (
        <section className="bg-white rounded-lg shadow-md border border-zinc-200">
            <div className="bg-gradient-to-r from-zinc-50 to-zinc-100 px-6 py-4 border-b border-zinc-200">
                <h2 className="text-2xl font-semibold">
                    Agregar Nuevo Producto
                </h2>
            </div>
            <form className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Titulo *
                        </label>
                        <input
                            placeholder="Ingrese el titulo"
                            required
                            type="text"
                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Descripcion *
                        </label>
                        <input
                            placeholder="Descripcion del producto"
                            required
                            type="text"
                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Precio Sugerido *
                        </label>
                        <input
                            placeholder="Ingrese el precio sugerido"
                            required
                            type="number"
                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Precio Lista *
                        </label>
                        <input
                            placeholder="Ingrese el precio lista"
                            required
                            type="number"
                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Marca *
                        </label>
                        <input
                            placeholder="Ingrese la marca"
                            required
                            type="text"
                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                    </div>

                    

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Codigo de lista *
                        </label>
                        <input
                            placeholder="Ingrese el codigo de lista"
                            required
                            type="number"
                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Color *
                        </label>
                        <Select>
                            <SelectTrigger className="w-full px-4 py-6 border border-zinc-300 rounded-lg bg-zinc-50 focus:bg-white">
                                <SelectValue placeholder="Seleccione un color" />
                            </SelectTrigger>
                            <SelectContent className="border-zinc-300 bg-white">
                                {colorsSelect.map((color) => (
                                    <SelectItem
                                        key={color}
                                        value={color}
                                        className="cursor-pointer hover:bg-zinc-50"
                                    >
                                        {color}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>     

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Stock *
                        </label>
                        <input
                            placeholder="Ingrese el stock"
                            required
                            type="number"
                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Categoria *
                        </label>
                        <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                            <SelectTrigger className="w-full px-4 py-6 border border-zinc-300 rounded-lg bg-zinc-50 focus:bg-white">
                                <SelectValue placeholder="Seleccione una categoría" />
                            </SelectTrigger>
                            <SelectContent className="border-zinc-300 bg-white">
                                {categoriesSelect.map((category) => (
                                    <SelectItem
                                        key={category}
                                        value={category}
                                        className="cursor-pointer hover:bg-zinc-50"
                                    >
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    
                    {/* Solo mostrar subcategoría si la categoría es "Electricas" */}
                    {selectedCategory === "Electricas" && (
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Subcategoria
                            </label>
                            <Select>
                                <SelectTrigger className="w-full px-4 py-6 border border-zinc-300 rounded-lg bg-zinc-50 focus:bg-white">
                                    <SelectValue placeholder="Seleccione una subcategoría" />
                                </SelectTrigger>
                                <SelectContent className="border-zinc-300 bg-white">
                                    {subcategoriesSelect.map((subcategory) => (
                                        <SelectItem
                                            key={subcategory}
                                            value={subcategory}
                                            className="cursor-pointer hover:bg-zinc-50"
                                        >
                                            {subcategory}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}   

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Grupo *
                        </label>
                        <input
                            placeholder="Ingrese solo el nombre. Ej: CS5 Traveler Red -> CS5 Traveler"
                            required
                            type="text"
                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Imágenes * (máximo 5)
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                        
                        {imagePreviews.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-zinc-700 mb-2">
                                    Vista previa ({imagePreviews.length}/5)
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <Image
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                width={100}
                                                height={100}
                                                className="w-full h-24 object-cover rounded-lg border border-zinc-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                            <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded">
                                                {index + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {imagePreviews.length === 0 && (
                                    <div className="text-center py-8 text-zinc-500">
                                        <FaImage size={24} className="mx-auto mb-2" />
                                        <p>No hay imágenes seleccionadas</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>      
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        className="bg-zinc-700 hover:bg-zinc-800 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 min-w-[160px] justify-center"
                    >
                        <span>Crear Producto</span>
                    </button>
                </div>
            </form>
        </section>
    );
};



const colorsSelect = [
    "Sunburst",
    "Crema",
    "Black",
    "Red",
    "Blue",
    "Natural",
    "Blanco",
    "Violeta",
    "Blue Burst",
    "Red sunburst",
    "Blue sunburst",
    "Brown sunburst",
    "Vintage Burst",
    "Though Blue",
    "Though Red",
    "Thru Black",
    "Gold",
    "Honey Burst",
    "Cherry Sunburst",
    "Blue Quilted"
]


const categoriesSelect = [
    "Electricas",
    "GuitarraCriolla",
    "AcusticasElectroacusticas",
    "ElectroacusticasAltaGama",
]

const subcategoriesSelect = [
    "stratocaster",
    "telecaster",
    "semihuecas",
    "lespaul",
]