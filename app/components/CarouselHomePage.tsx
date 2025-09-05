'use client'


import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/app/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import Image from "next/image"

import image1 from '@/app/images/carousel/2.jpg'
import image2 from '@/app/images/carousel/3.jpg'
import image3 from '@/app/images/carousel/5.jpg'
import image4 from '@/app/images/carousel/6.jpg'
import image5 from '@/app/images/carousel/7.jpg'
import image6 from '@/app/images/carousel/8.jpg'
import image7 from '@/app/images/carousel/9.jpg'
import image8 from '@/app/images/carousel/10.jpg'
import image9 from '@/app/images/carousel/11.jpg'


const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9]

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
            <CarouselContent className="md:h-[55vh]">
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <Image
                            src={image}
                            alt="Carousel Image"
                            width={1920}
                            height={1080}
                        />
                    </CarouselItem>
                ))}
                {/* <CarouselItem>
                    <Image
                        src={image6}
                        alt="Carousel Image"
                        width={1920}
                        height={1080}
                    />
                </CarouselItem>
                <CarouselItem>
                    <Image
                        src={image7}
                        alt="Carousel Image"
                        width={1920}
                        height={1080}
                    />
                </CarouselItem>
                <CarouselItem>
                    <Image
                        src={image8}
                        alt="Carousel Image"
                        width={1920}
                        height={1080}
                    />
                </CarouselItem>
                <CarouselItem>
                    <Image
                        src={image9}
                        alt="Carousel Image"
                        width={1920}
                        height={1080}
                    />
                </CarouselItem>
                <CarouselItem>
                    <Image
                        src={image10}
                        alt="Carousel Image"
                        width={1920}
                        height={1080}
                    />
                </CarouselItem>
                <CarouselItem>
                    <Image
                        src={image11}
                        alt="Carousel Image"
                        width={1920}
                        height={1080}
                    />
                </CarouselItem> */}
            </CarouselContent>
        </Carousel>
      </div>
    )
}   