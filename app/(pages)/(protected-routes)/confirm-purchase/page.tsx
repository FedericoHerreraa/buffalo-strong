
import { ConfirmPurchaseComponent } from "./ConfirmPurchaseComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Confirmar Compra | buffalo Strong`,
    description: `Finaliza tu compra en buffalo Strong y confirma los detalles de tu pedido de instrumentos musicales. Compra segura, rápida y sin complicaciones.`,
  };

export default function ConfirmPurchase() {
    return (
        <ConfirmPurchaseComponent />
    )
}