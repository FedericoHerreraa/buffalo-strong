"use client";

import { useState } from "react";
import { FaPlus, FaImage, FaTrash, FaCheck } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Spinner } from "@/app/images/icons/Spinner";

interface ProductFormData {
  title: string;
  listCode: string;
  wholesalePrice: number;
  suggestedPrice: number;
  stock: number;
  category: string;
  color: string;
  description: string;
  brand: string;
  model: string;
  specifications: string;
}

export const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>();

  const [images, setImages] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addImagePlaceholder = () => {
    if (images.length < 5) {
      setImages([...images, `placeholder-${Date.now()}`]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Aquí iría la lógica para enviar a la BD
      console.log("Datos del producto:", data);
      console.log("Imágenes:", images);

      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      reset();
      setImages([]);

      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError("Error al crear el producto");
      setTimeout(() => setError(null), 4000);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-zinc-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-50 to-zinc-100 px-6 py-4 border-b border-zinc-200">
        <h2 className="text-xl font-semibold text-zinc-800">
          Agregar Nuevo Producto
        </h2>
        <p className="text-zinc-600 text-sm mt-1">
          Completa todos los campos para agregar un producto al catálogo
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna 1: Información básica */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-zinc-800 border-b border-zinc-200 pb-2">
              Información Básica
            </h3>

            {/* Nombre del producto */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Nombre del producto *
              </label>
              <input
                {...register("title", { required: "El nombre es obligatorio" })}
                placeholder="Ej: Guitarra Acústica Fender"
                type="text"
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Código de producto */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Código del producto *
              </label>
              <input
                {...register("listCode", {
                  required: "El código es obligatorio",
                })}
                placeholder="Ej: CS10STDPACK"
                type="text"
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
              />
              {errors.listCode && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.listCode.message}
                </p>
              )}
            </div>

            {/* Precio mayorista */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Precio mayorista *
              </label>
              <input
                {...register("wholesalePrice", {
                  required: "El precio mayorista es obligatorio",
                  min: { value: 0, message: "El precio debe ser mayor a 0" },
                })}
                placeholder="0.00"
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
              />
              {errors.wholesalePrice && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.wholesalePrice.message}
                </p>
              )}
            </div>

            {/* Precio sugerido al público */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Precio sugerido al público *
              </label>
              <input
                {...register("suggestedPrice", {
                  required: "El precio sugerido es obligatorio",
                  min: { value: 0, message: "El precio debe ser mayor a 0" },
                })}
                placeholder="0.00"
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
              />
              {errors.suggestedPrice && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.suggestedPrice.message}
                </p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Stock inicial *
              </label>
              <input
                {...register("stock", {
                  required: "El stock es obligatorio",
                  min: {
                    value: 0,
                    message: "El stock debe ser mayor o igual a 0",
                  },
                })}
                placeholder="0"
                type="number"
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          {/* Columna 2: Detalles del producto */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-zinc-800 border-b border-zinc-200 pb-2">
              Detalles del Producto
            </h3>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Categoría *
              </label>
              <select
                {...register("category", {
                  required: "La categoría es obligatoria",
                })}
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
              >
                <option value="">Selecciona una categoría</option>
                <option value="criolla">Guitarra Criolla</option>
                <option value="acusticaElectroacustica">
                  Guitarra Acustica y Electroacustica
                </option>
                <option value="electrica">Guitarra Electrica</option>
                <option value="electroacusticaAltaGama">
                  Guitarra Electroacustica Alta Gama
                </option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Marca */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Marca *
              </label>
              <input
                {...register("brand", { required: "La marca es obligatoria" })}
                placeholder="Ej: Eko, Fender, ..."
                type="text"
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
              />
              {errors.brand && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.brand.message}
                </p>
              )}
            </div>

            {/* Modelo solo aplicable a las guitarras eléctricas */}
            {/* {category === "electrica" && (
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Modelo
                </label>
                <input
                {...register("model")}
                placeholder="Ej: Stratocaster, Les Paul"
                type="text"
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
              />
            </div>
            )} */}

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Color *
              </label>
              <input
                {...register("color", { required: "El color es obligatorio" })}
                placeholder="Ej: Negro, Blanco, Natural"
                type="text"
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
              />
              {errors.color && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.color.message}
                </p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Descripción
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Descripción detallada del producto..."
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white resize-none"
              />
            </div>
          </div>

          {/* Columna 3: Imágenes y especificaciones */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-zinc-800 border-b border-zinc-200 pb-2">
              Imágenes y Especificaciones
            </h3>

            {/* Sección de imágenes */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Imágenes del producto
              </label>
              <div className="space-y-3">
                {/* Imágenes existentes */}
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-zinc-50 p-3 rounded-lg border border-zinc-200"
                  >
                    <FaImage className="text-zinc-400" size={20} />
                    <span className="flex-1 text-sm text-zinc-600">
                      Imagen {index + 1} (Placeholder)
                    </span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}

                {/* Botón agregar imagen */}
                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={addImagePlaceholder}
                    className="w-full border-2 border-dashed border-zinc-300 rounded-lg p-6 text-center hover:border-zinc-400 transition-colors"
                  >
                    <FaPlus className="mx-auto text-zinc-400 mb-2" size={24} />
                    <p className="text-zinc-500 text-sm">
                      Agregar imagen ({images.length}/5)
                    </p>
                  </button>
                )}
              </div>
            </div>

            {/* Especificaciones técnicas */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Especificaciones técnicas
              </label>
              <textarea
                {...register("specifications")}
                rows={6}
                placeholder="Especificaciones técnicas del producto:&#10;- Material: &#10;- Dimensiones: &#10;- Peso: &#10;- Características especiales:"
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* Mensajes de estado */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <span>⚠</span>
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <FaCheck />
            ¡Producto creado exitosamente!
          </div>
        )}

        {/* Botones de acción */}
        <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-zinc-200">
          <button
            type="button"
            onClick={() => {
              reset();
              setImages([]);
              setError(null);
              setSuccess(false);
            }}
            className="px-6 py-3 border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors"
          >
            Limpiar Formulario
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-zinc-700 hover:bg-zinc-800 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 min-w-[160px] justify-center"
          >
            {isSubmitting ? (
              <>
                <Spinner />
                <span>Creando...</span>
              </>
            ) : (
              <>
                <FaPlus size={16} />
                <span>Crear Producto</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
