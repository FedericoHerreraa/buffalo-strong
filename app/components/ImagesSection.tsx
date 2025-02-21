
import Image from 'next/image';
import ekoImage from '@/app/images/carousel/carouselImage.webp'
import otherImage from '@/app/images/carousel/carouselImage2.webp'
import { merriweather_sans } from '@/app/fonts/fonts';

export const ImagesSection = () => {
    return (
        <div className={`bg-gradient-to-b from-white via-zinc-100 to-white py-5 ${merriweather_sans.className}`}>
            <div className="w-[85%] mx-auto">
                <div className="flex gap-3"> 
                    <div className="w-1/2 h-[300px] rounded-lg hover:scale-105 transition-all duration-200 shadow-lg border border-zinc-200 overflow-hidden">
                        <Image
                            src={ekoImage}
                            alt="Imagen 1"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-1/2 h-[300px] rounded-lg hover:scale-105 transition-all duration-200 shadow-lg border border-zinc-200 overflow-hidden">
                        <Image
                            src={otherImage}
                            alt="Imagen 2"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}