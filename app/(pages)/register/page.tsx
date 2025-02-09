
import { RegisterComponent } from '@/app/components/Register';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buffalo Strong",
  description: "Buffalo Strong is a community-driven platform that connects local businesses with customers in the Buffalo area.",
};

export default function Register() {
    return (
      <RegisterComponent />
    );
}