
import Image from 'next/image';
import ekoImage from '@/app/images/carousel/carouselImage.webp'
import otherImage from '@/app/images/carousel/carouselImage2.webp'

export const ImagesSection = () => {
    return (
        <div className=" w-[90%] mx-auto">
            <div className="flex gap-3">
                <div className="w-1/2 h-[300px] rounded-md shadow-lg border border-zinc-100 overflow-hidden">
                    <Image
                        src={ekoImage}
                        alt="Imagen 1"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-1/2 h-[300px] rounded-md shadow-lg border border-zinc-100 overflow-hidden">
                    <Image
                        src={otherImage}
                        alt="Imagen 2"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="w-full h-[400px] mt-3 rounded-md shadow-lg border border-zinc-100 overflow-hidden">
                <Image
                    src={ekoImage}
                    alt="Imagen 3"
                    width={1600}
                    height={900}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}