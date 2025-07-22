import { useState } from "react";
import { FaImage, FaTrash } from "react-icons/fa6";
import Image from "next/image";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProductFormData,
  createProductFormSchema,
} from "@/app/schemas/schemas";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export const AddProductToDB = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductFormSchema),
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const addProduct = (data: CreateProductFormData) => {
    if (selectedImages.length === 0) {
      alert("Debe seleccionar al menos una imagen");
      return;
    }

    console.log("Form data:", data);
    console.log("Selected images:", selectedImages);

    // Aquí procesarías las imágenes y crearías el producto
    // 1. Subir imágenes a Supabase Storage
    // 2. Obtener URLs de las imágenes
    // 3. Crear producto en la base de datos con las URLs

    reset();
    setSelectedImages([]);
    setImagePreviews([]);
    setSelectedCategory("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Verificar que no se excedan las 5 imágenes totales
    if (selectedImages.length + files.length > 5) {
      alert(
        `Máximo 5 imágenes permitidas. Actualmente tienes ${selectedImages.length} imágenes.`
      );
      return;
    }

    // Agregar las nuevas imágenes al array existente
    const newImages = [...selectedImages, ...files];
    setSelectedImages(newImages);

    // Crear previews para las nuevas imágenes y agregarlas a las existentes
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
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
        <h2 className="text-2xl font-semibold">Agregar Nuevo Producto</h2>
      </div>
      <form onSubmit={handleSubmit(addProduct)} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Titulo *
            </label>
            <input
              {...register("title")}
              placeholder="Ingrese el titulo"
              required
              type="text"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Descripcion *
            </label>
            <input
              {...register("description")}
              placeholder="Descripcion del producto"
              required
              type="text"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Precio Sugerido *
            </label>
            <input
              {...register("sugestedPrice", { valueAsNumber: true })}
              placeholder="Ingrese el precio sugerido"
              required
              type="number"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
            />
            {errors.sugestedPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sugestedPrice.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Precio Lista *
            </label>
            <input
              {...register("listPrice", { valueAsNumber: true })}
              placeholder="Ingrese el precio lista"
              required
              type="number"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
            />
            {errors.listPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.listPrice.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Marca *
            </label>
            <input
              {...register("brand")}
              placeholder="Ingrese la marca"
              required
              type="text"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brand.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Codigo de lista *
            </label>
            <input
              {...register("listCode", { valueAsNumber: true })}
              placeholder="Ingrese el codigo de lista"
              required
              type="number"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
            />
            {errors.listCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.listCode.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Color *
            </label>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
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
              )}
            />
            {errors.color && (
              <p className="text-red-500 text-sm mt-1">
                {errors.color.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Stock *
            </label>
            <input
              {...register("stock", { valueAsNumber: true })}
              placeholder="Ingrese el stock"
              required
              type="number"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Categoria *
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedCategory(value);
                  }}
                  value={field.value}
                >
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
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {selectedCategory === "Electricas" && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Subcategoria
              </label>
              <Controller
                name="subcategory"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
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
                )}
              />
              {errors.subcategory && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subcategory.message}
                </p>
              )}
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Grupo *
            </label>
            <input
              {...register("group")}
              placeholder="Ingrese solo el nombre. Ej: CS5 Traveler Red -> CS5 Traveler"
              required
              type="text"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
            />
            {errors.group && (
              <p className="text-red-500 text-sm mt-1">
                {errors.group.message}
              </p>
            )}
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

            {imagePreviews.length > 0 ? (
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
              </div>
            ) : (
              <div className="mt-4 text-center py-8 text-zinc-500 border-2 border-dashed border-zinc-300 rounded-lg">
                <FaImage size={24} className="mx-auto mb-2" />
                <p>No hay imágenes seleccionadas</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-zinc-700 hover:bg-zinc-800 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 min-w-[160px] justify-center"
          >
            <span>{isSubmitting ? "Creando..." : "Crear Producto"}</span>
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
  "Blue Quilted",
];

const categoriesSelect = [
  "Electricas",
  "GuitarraCriolla",
  "AcusticasElectroacusticas",
  "ElectroacusticasAltaGama",
];

const subcategoriesSelect = [
  "stratocaster",
  "telecaster",
  "semihuecas",
  "lespaul",
];
