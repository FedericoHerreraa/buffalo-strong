
import { AdminDashboardComponent } from "./AdminDashboardComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Panel de Administración | Buffalo Strong`,
    description: `Accede al panel de administración de Buffalo Strong para gestionar productos, pedidos y usuarios de manera eficiente. Todo lo que necesitas en un solo lugar.`,
};

export default function AdminDashboard() {
    return (
        <AdminDashboardComponent />
    )
}