
import Image from 'next/image';
import ekoImage from '@/app/images/carousel/carouselImage.webp'
import otherImage from '@/app/images/carousel/carouselImage2.webp'
import { open_sans } from '@/app/fonts/fonts';

export const ImagesSection = () => {
    return (
        <div className={`bg-gradient-to-b from-white via-zinc-100 to-white py-5 ${open_sans.className}`}>
            <div className="md:w-[85%] w-[95%] mx-auto">
                <div className="flex md:flex-row flex-col gap-3"> 
                    <div className="md:w-1/2 h-[300px] rounded-lg transition-all duration-200 shadow-lg border border-zinc-200 overflow-hidden">
                        <Image
                            src={ekoImage}
                            alt="Imagen 1"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 h-[300px] rounded-lg transition-all duration-200 shadow-lg border border-zinc-200 overflow-hidden">
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