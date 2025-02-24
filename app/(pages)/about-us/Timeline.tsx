import React from "react";
import Image from "next/image";
import guitarra from "@/app/images/nosotros/guitarras.jpg";
import instrumento from "@/app/images/nosotros/tocando.jpg";

export const Timeline = () => {
  return (
    <section className="w-full h-screen flex flex-col md:grid md:grid-cols-2">
      {content.map((item) => (
        <div key={item.id} className="relative w-full h-full group">
          {/* Imagen de fondo */}
          <Image
            alt="Imagen"
            src={item.image}
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
          />

          {/* Contenedor de texto que aparece al hacer hover */}
          <div className="absolute inset-0 bg-black bg-opacity-60 text-white p-8 flex items-center justify-center  ">
            <p className="text-lg md:text-xl text-center">{item.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

const content = [
  {
    id: 1,
    text: "Buffalo Strong nació con la pasión por la música y el deseo de acercar instrumentos de alta calidad a artistas de todo el mundo. Desde nuestros inicios, nos especializamos en la importación de instrumentos musicales únicos, seleccionados por su sonido y durabilidad. Trabajamos con marcas reconocidas y luthiers independientes para ofrecer una colección exclusiva a nuestros clientes.",
    image: guitarra,
  },
  {
    id: 2,
    text: "Nuestra comunidad de músicos crece día a día, brindando asesoramiento y soporte personalizado a cada cliente. Hoy, Buffalo Strong es sinónimo de calidad, pasión y compromiso con la música, y seguimos ampliando nuestro catálogo para vos.",
    image: instrumento,
  },
];
