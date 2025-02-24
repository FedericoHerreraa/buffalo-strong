import { NewsComponent } from "./News";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Últimas Noticias | Buffalo's Strong`,
  description: `Mantente informado con las últimas novedades del mundo de la música e instrumentos en Buffalo's Strong.`,
};

export default function News() {
    return (
      <NewsComponent />
    );
}