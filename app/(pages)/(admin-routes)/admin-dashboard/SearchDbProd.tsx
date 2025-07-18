import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ProductDB } from "@/app/types/types";
import { open_sans } from "@/app/fonts/fonts";
import { toast } from "sonner";

export const SearchDbProd = () => {
  const [listCode, setListCode] = useState<string | null>(null);
  const [prod, setProd] = useState<ProductDB>();
  const [stock, setStock] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchProd = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("listCode", listCode)
      .single();

    if (error) {
      setError(
        "Error al buscar producto (puede ser que el id no sea correcto)"
      );
      setTimeout(() => setError(null), 4000);
      return;
    }

    setProd(data);
  };

  const updateProd = async () => {
    const { error } = await supabase
      .from("products")
      .update({ stock: stock })
      .eq("listCode", listCode);

    if (error) {
      setError("Error al actualizar stock");
      setTimeout(() => setError(null), 4000);
      return;
    }

    toast.custom((t) => {
      setTimeout(() => toast.dismiss(t), 5000);
      return (
        <div className="p-3 bg-zinc-900 border border-zinc-600 text-white rounded-md">
          Stock actualizado con exito!
        </div>
      );
    });

    setProd(undefined);
    setListCode(null);
    setStock(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg border border-zinc-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-50 to-zinc-100 px-6 py-4 border-b border-zinc-200">
        <h1
          className={`text-2xl font-semibold text-zinc-800 ${open_sans.className}`}
        >
          Gestión de Stock de Productos
        </h1>
      </div>

      <div className="p-6">
        {/* Search Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-200">
              <h3 className="text-lg font-medium text-zinc-700 mb-4">
                Buscar Producto
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">
                    Código de producto
                  </label>
                  <input
                    placeholder="Ejemplo: 06204126"
                    value={listCode || ""}
                    onChange={(e) => setListCode(e.target.value)}
                    className="w-full border border-zinc-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                    type="text"
                  />
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <button
                  onClick={searchProd}
                  className="w-full bg-zinc-700 hover:bg-zinc-800 text-white py-2.5 px-4 rounded-lg transition-colors font-medium"
                >
                  Buscar Producto
                </button>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          {prod ? (
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-amber-50 to-zinc-50 rounded-lg border border-amber-200 overflow-hidden">
                {/* Product Header */}
                <div className="bg-gradient-to-r from-amber-100 to-zinc-100 px-4 py-3 border-b border-amber-200">
                  <h3 className="text-lg font-semibold text-zinc-800">
                    Producto Encontrado
                  </h3>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Product Details */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-zinc-600">
                          Nombre del producto:
                        </p>
                        <p className="font-semibold text-zinc-800 text-lg">
                          {prod.title}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-600">Código:</p>
                        <p className="font-medium text-zinc-700">
                          {prod.listCode}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-600">Stock actual:</p>
                        <p className="text-2xl font-bold text-amber-600">
                          {prod.stock} unidades
                        </p>
                      </div>
                    </div>

                    {/* Product Image */}
                    <div className="flex justify-center md:justify-end">
                      <div className="relative">
                        <Image
                          alt={prod.title}
                          className="rounded-lg shadow-md border border-zinc-200"
                          src={prod.img[0]}
                          width={160}
                          height={160}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stock Update Section */}
                  <div className="mt-6 pt-4 border-t border-amber-200">
                    <h4 className="text-lg font-medium text-zinc-800 mb-3">
                      Actualizar Stock
                    </h4>
                    <div className="flex flex-col sm:flex-row gap-3 items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-zinc-600 mb-2">
                          Nuevo stock
                        </label>
                        <input
                          type="number"
                          value={stock || ""}
                          onChange={(e) => setStock(parseInt(e.target.value))}
                          placeholder="Ingrese cantidad"
                          className="w-full border border-zinc-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={updateProd}
                        disabled={!stock}
                        className="bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white py-2.5 px-6 rounded-lg transition-colors font-medium whitespace-nowrap"
                      >
                        Actualizar Stock
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2">
              <div className="bg-zinc-50 rounded-lg border-2 border-dashed border-zinc-300 p-8 text-center">
                <div className="text-zinc-400 mb-3">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-zinc-500 text-lg font-medium">
                  Busca un producto por su código
                </p>
                <p className="text-zinc-400 text-sm mt-1">
                  Ingresa el código del producto para ver sus detalles y
                  modificar el stock
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
