"use client";

import { useState } from "react";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaUser,
  FaMagnifyingGlass,
  FaPlus,
  FaGauge,
} from "react-icons/fa6";
import { useAuth } from "@/app/context/AuthContext";
import { SearchDbProd } from "./SearchDbProd";
import { SendUserCredentials } from "@/app/components/SendUserCredentials";
import { AddProduct } from "./AddProduct";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterAdminFormData,
  registerAdminSchema,
} from "@/app/schemas/schemas";
import { Spinner } from "@/app/images/icons/Spinner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import Link from "next/link";

export const AdminDashboardComponent = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterAdminFormData>({
    resolver: zodResolver(registerAdminSchema),
  });
  const { createUser } = useAuth();

  const [showNext, setShowNext] = useState(false);
  const [formInfo, setFormInfo] = useState<RegisterAdminFormData>();
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<
    "dashboard" | "users" | "search" | "add-product"
  >("dashboard");

  // Configuración de navegación del sidebar
  const navItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: FaGauge,
      title: "Dashboard de Buffalo's",
    },
    {
      id: "users" as const,
      label: "Agregar Usuario",
      icon: FaUser,
      title: "Administrar Usuarios",
    },
    {
      id: "search" as const,
      label: "Buscar Productos",
      icon: FaMagnifyingGlass,
      title: "Buscar Productos",
    },
    {
      id: "add-product" as const,
      label: "Agregar Producto",
      icon: FaPlus,
      title: "Agregar Producto",
    },
  ];

  // Configuración de cards del dashboard
  const dashboardCards = [
    {
      title: "Usuarios",
      description: "Gestiona los usuarios del sistema",
      buttonText: "Ir a Usuarios",
      targetSection: "users" as const,
    },
    {
      title: "Productos",
      description: "Busca y administra productos",
      buttonText: "Buscar Productos",
      targetSection: "search" as const,
    },
    {
      title: "Nuevo Producto",
      description: "Agrega productos al catálogo",
      buttonText: "Agregar Producto",
      targetSection: "add-product" as const,
    },
  ];

  const addUser = async (data: RegisterAdminFormData) => {
    setFormInfo(data);
    console.log(data.role);

    const res = await createUser(
      data.email,
      data.name,
      data.password,
      parseInt(data.cuit),
      data.address,
      data.role
    );

    if (res === "A user with this email address has already been registered") {
      setError("Ya existe un usuario con este correo electrónico");
      setTimeout(() => setError(null), 4000);
      return;
    }

    setShowNext(true);
    reset();
  };

  return (
    <div className="min-h-[100vh] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-800 text-white min-h-screen fixed left-0 top-0 z-10">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-zinc-200 text-transparent bg-clip-text">
            Admin Panel
          </h2>
          <nav className="space-y-4">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-zinc-700 text-amber-400"
                      : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
                  }`}
                >
                  <IconComponent size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="absolute bottom-6 left-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <FaArrowLeftLong size={16} />
            <span className="text-sm">Volver al inicio</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-700 to-zinc-700 text-transparent bg-clip-text drop-shadow-md">
            {navItems.find((item) => item.id === activeSection)?.title}
          </h1>
        </header>

        {activeSection === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardCards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-zinc-200"
              >
                <h3 className="text-lg font-semibold text-zinc-700 mb-2">
                  {card.title}
                </h3>
                <p className="text-zinc-600">{card.description}</p>
                <button
                  onClick={() => setActiveSection(card.targetSection)}
                  className="mt-4 bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  {card.buttonText}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeSection === "users" && (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Formulario de Usuario */}
              <div className="xl:col-span-7">
                <div className="bg-white rounded-xl shadow-lg border border-zinc-200 overflow-hidden">
                  {/* Header del formulario */}
                  <div className="bg-gradient-to-r from-zinc-50 to-zinc-100 px-6 py-4 border-b border-zinc-200">
                    <h2 className="text-xl font-semibold text-zinc-800">
                      Nuevo Usuario
                    </h2>
                    <p className="text-zinc-600 text-sm mt-1">
                      Completa los datos para crear un nuevo usuario en el
                      sistema
                    </p>
                  </div>

                  {/* Formulario */}
                  <form onSubmit={handleSubmit(addUser)} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Nombre completo */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                          Nombre completo *
                        </label>
                        <input
                          {...register("name")}
                          placeholder="Ingrese el nombre completo"
                          type="text"
                          className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <span className="text-red-500">⚠</span>
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                          Correo electrónico *
                        </label>
                        <input
                          {...register("email")}
                          placeholder="usuario@ejemplo.com"
                          type="email"
                          className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <span className="text-red-500">⚠</span>
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Contraseña */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                          Contraseña *
                        </label>
                        <input
                          {...register("password")}
                          placeholder="Contraseña segura"
                          type="password"
                          className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                        {errors.password && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <span className="text-red-500">⚠</span>
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      {/* CUIT */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                          CUIT *
                        </label>
                        <input
                          {...register("cuit")}
                          placeholder="20-12345678-9"
                          type="text"
                          className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                        {errors.cuit && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <span className="text-red-500">⚠</span>
                            {errors.cuit.message}
                          </p>
                        )}
                      </div>

                      {/* Dirección */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                          Dirección *
                        </label>
                        <input
                          {...register("address")}
                          placeholder="Calle 123"
                          type="text"
                          className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all bg-zinc-50 focus:bg-white"
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <span className="text-red-500">⚠</span>
                            {errors.address.message}
                          </p>
                        )}
                      </div>

                      {/* Rol */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                          Rol de usuario *
                        </label>
                        <Controller
                          name="role"
                          control={control}
                          defaultValue="Cliente"
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full px-4 py-3 border border-zinc-300 rounded-lg bg-zinc-50 focus:bg-white">
                                <SelectValue placeholder="Seleccione un rol" />
                              </SelectTrigger>
                              <SelectContent className="border-zinc-300 bg-white">
                                <SelectItem
                                  value="Cliente"
                                  className="cursor-pointer hover:bg-zinc-50"
                                >
                                  👤 Cliente
                                </SelectItem>
                                <SelectItem
                                  value="Admin"
                                  className="cursor-pointer hover:bg-zinc-50"
                                >
                                  🛠️ Administrador
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>

                    {/* Error general */}
                    {error && (
                      <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                        <span className="text-red-500">⚠</span>
                        {error}
                      </div>
                    )}

                    {/* Botón submit */}
                    <div className="mt-8 flex justify-end">
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
                            <FaUser size={16} />
                            <span>Crear Usuario</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Flecha de transición */}
              <div className="xl:col-span-1 flex items-center justify-center">
                <div className="bg-zinc-100 rounded-full p-4">
                  <FaArrowRightLong
                    size={24}
                    className="text-zinc-600 xl:rotate-0 rotate-90"
                  />
                </div>
              </div>

              {/* Panel de envío de credenciales */}
              <div className="xl:col-span-4">
                {showNext ? (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-4 border-b border-green-200">
                      <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                        <span className="text-green-600">✅</span>
                        Usuario Creado
                      </h3>
                      <p className="text-green-700 text-sm mt-1">
                        Envía las credenciales al nuevo usuario
                      </p>
                    </div>
                    <div className="p-6">
                      {formInfo && (
                        <SendUserCredentials
                          formInfo={formInfo}
                          setShowNext={setShowNext}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-300 p-8 text-center h-full flex flex-col justify-center">
                    <div className="text-zinc-400 mb-4">
                      <svg
                        className="mx-auto h-16 w-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-zinc-600 mb-2">
                      Envío de Credenciales
                    </h3>
                    <p className="text-zinc-500 text-sm">
                      Una vez creado el usuario, aquí podrás enviar las
                      credenciales por correo electrónico
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === "search" && (
          <section>
            <SearchDbProd />
          </section>
        )}

        {activeSection === "add-product" && (
          <section>
            <AddProduct />
          </section>
        )}
      </main>
    </div>
  );
};
