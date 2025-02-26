'use client'


import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/app/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import Image from "next/image"

// import carouselImage from '@/app/images/carousel/carouselImage.webp'
import carouselImage2 from '@/app/images/carousel/carouselImage2.webp'

export const CarouselHomePage = () => {
    return (
      <div>
        <Carousel
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
          >
            <CarouselContent>
                <CarouselItem>
                    <Image
                        src={carouselImage2}
                        alt="Carousel Image"
                        width={1920}
                        height={1080}
                    />
                </CarouselItem>
                <CarouselItem>
                    <Image
                        src={carouselImage2}
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