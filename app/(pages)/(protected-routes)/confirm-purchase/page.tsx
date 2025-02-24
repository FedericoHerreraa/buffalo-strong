
import { ConfirmPurchaseComponent } from "./ConfirmPurchaseComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Confirmar Compra | Buffalo's Strong`,
    description: `Finaliza tu compra en Buffalo's Strong y confirma los detalles de tu pedido de instrumentos musicales. Compra segura, rápida y sin complicaciones.`,
  };

export default function ConfirmPurchase() {
    return (
        <ConfirmPurchaseComponent />
    )
}