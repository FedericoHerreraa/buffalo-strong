
import { RegisterController } from "./RegisterController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Regístrate en buffalo Strong | Crea tu cuenta`,
  description: `Únete a buffalo Strong y accede a la mejor selección de instrumentos musicales. Regístrate ahora y comienza tu experiencia de compra.`,
};

export default function Register() {
    return (
      <RegisterController />
    );
}