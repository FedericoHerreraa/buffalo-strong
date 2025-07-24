"use client";

import { useState } from "react";
import Link from "next/link";

import {
  FaArrowLeftLong,
  FaUser,
  FaMagnifyingGlass,
  FaPlus,
  FaGauge,
  FaBars,
  FaXmark,
} from "react-icons/fa6";

import { SearchDbProd } from "./SearchDbProd";
import { AddUserToDB } from "./AddUserToDB";
import { AddProductController } from "./add-prod-to-db/AddProductController";

export const AdminDashboardComponent = () => {
  const [activeSection, setActiveSection] = useState<"dashboard" | "users" | "search" | "add-product">("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-[100vh] flex">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-30 bg-zinc-800 text-white p-2 rounded-md shadow-lg"
      >
        {isMobileMenuOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
      </button>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`
        w-64 bg-zinc-800 text-white min-h-screen fixed left-0 top-0 z-20 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-8 md:mt-0 mt-10 bg-gradient-to-r from-amber-400 to-zinc-200 text-transparent bg-clip-text">
            Admin Panel
          </h2>
          <nav className="space-y-4">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeSection === item.id
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

      <main className="flex-1 p-6 pt-16 lg:pt-6">
        <header className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-700 to-zinc-700 text-transparent bg-clip-text drop-shadow-md">
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
          <AddUserToDB />
        )}

        {activeSection === "search" && (
          <SearchDbProd />
        )}

        {activeSection === "add-product" && (
          <AddProductController />
        )}
      </main>
    </div>
  );
};


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