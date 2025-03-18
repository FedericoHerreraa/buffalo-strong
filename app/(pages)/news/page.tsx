import { NewsComponent } from "./News";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Últimas Noticias | buffalo Strong`,
  description: `Mantente informado con las últimas novedades del mundo de la música e instrumentos en buffalo Strong.`,
};

export default function News() {
    return (
      <NewsComponent />
    );
}