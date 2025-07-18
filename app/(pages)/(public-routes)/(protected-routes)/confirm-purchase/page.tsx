
import { ConfirmPurchaseComponent } from "./ConfirmPurchaseComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Confirmar Compra | Strong Buffalo Music`,
    description: `Finaliza tu compra en Strong Buffalo Music y confirma los detalles de tu pedido de instrumentos musicales. Compra segura, rápida y sin complicaciones.`,
  };

export default function ConfirmPurchase() {
    return (
        <ConfirmPurchaseComponent />
    )
}