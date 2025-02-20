'use client'

import { merriweather_sans } from "@/app/fonts/fonts"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/app/components/ui/carousel"

import criolla from '@/app/images/products/CS10STDPACK.jpg'
import acustica from '@/app/images/products/RANGER6.jpg'
import electrica from '@/app/images/products/VT-380RELIC.jpg'
import altaGama from '@/app/images/products/WOWD800ESS.jpg'
import Image from "next/image"
  

export const FIltersComponent = () => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div
            className={`w-full mx-auto h-48 md:h-56 flex items-center justify-center bg-gradient-to-b from-white via-zinc-50 to-white ${merriweather_sans.className}`}
        >
        <Carousel className="w-full max-w-xs md:max-w-lg mx-auto" opts={{ loop: true}}>
            <CarouselContent className="flex items-center text-center">
                {Filters.map((item, index) => (
                    <CarouselItem
                        key={index}
                        className="basis-1/2 md:basis-1/4 flex justify-center flex-col"
                    >
                    <div className="flex flex-col items-center gap-2 p-2" onClick={() => scrollToSection(item.key)}>
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white p-2 overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <Image
                                alt={item.name}
                                src={item.img}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-sm md:text-base font-semibold text-gray-700">{item.name}</p>
                    </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            
        </Carousel>
        </div>
    )
}

const Filters = [
    {
        id: 1,
        name: 'Guitarras Criollas',
        img: criolla,
        key: 'GuitarraCriolla'
    },
    {
        id: 2,
        name: 'Acústicas y Electroacústicas',
        img: acustica,
        key: 'AcusticasElectroacusticas'
    },
    {
        id: 3,
        name: 'Guitarras Eléctricas',
        img: electrica,
        key: 'Electricas'
    },
    {
        id: 4,
        name: 'Electroacústicas Alta Gama',
        img: altaGama,
        key: 'ElectroacusticasAltaGama'
    }
]