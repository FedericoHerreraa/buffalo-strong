import { NewsComponent } from "./News";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Últimas Noticias | Strong Buffalo Music`,
  description: `Mantente informado con las últimas novedades del mundo de la música e instrumentos en Strong Buffalo Music.`,
};

export default function News() {
    return (
      <NewsComponent />
    );
}