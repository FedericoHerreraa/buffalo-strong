'use client'


import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/app/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import Image from "next/image"

import image2 from '@/app/images/carousel/carouselImage2.webp'
import image3 from '@/app/images/carousel/carouselImage3.jpg'
import image4 from '@/app/images/carousel/carouselImage4.jpg'

export const CarouselHomePage = () => {
    return (
      <div>
        <Carousel
            opts={{
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
          >
            <CarouselContent className="md:h-[45vh]">
                <CarouselItem>
                    <Image
                        src={image2}
                        alt="Carousel Image"
                        width={1920}
                        height={1080}
                    />
                </CarouselItem>
                <CarouselItem>
                    <Image
                        src={image3}
                        alt="Carousel Image"
                        width={1920}
                        height={1080}
                    />
                </CarouselItem>
                <CarouselItem>
                    <Image
                        src={image4}
                        alt="Carousel Image"
                        width={1920}
                        height={1080}
                    />
                </CarouselItem>
            </CarouselContent>
        </Carousel>
      </div>
    )
}   