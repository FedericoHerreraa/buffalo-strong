import { open_sans } from "@/app/fonts/fonts";

export const ProductCardSkeleton = () => {
    return (
        <div className="animate-pulse bg-white rounded-xl shadow-md p-4 space-y-3 w-full min-w-[250px] max-w-[280px] flex-shrink-0">
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-48 rounded-lg" />
            <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3" />
            </div>
            <div className="flex justify-between items-center pt-2">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20" />
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24" />
            </div>
        </div>
    );
};

export const CategorySkeleton = () => {
    return (
        <div className="mb-6 w-full animate-pulse">
            <div className="flex md:flex-row flex-col md:gap-5 gap-3 md:items-center mb-5">
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48" />
                <div className="flex items-center gap-2">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32" />
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4" />
                </div>
                <div className="md:w-full w-0 md:h-[1px] h-0 bg-gray-300"></div>
            </div>
            <div className="flex md:gap-4 gap-1 overflow-x-auto whitespace-nowrap pb-5">
                {[...Array(4)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export const ProductsSkeleton = () => {
    return (
        <div className={`min-h-[100vh] ${open_sans.className} md:bg-gradient-to-b from-white via-zinc-200 to-white mt-20`}>
            <section className="flex gap-20 md:p-10 p-1 mb-5 md:w-[85%] w-[93%] mx-auto flex-wrap md:shadow-lg md:border-x bg-white md:border-x-zinc-200 md:rounded-b-lg animate-pulse">
                <div className="flex w-full md:flex-row flex-col-reverse items-center md:justify-between justify-start md:gap-20 gap-5">
                    <div className="md:w-2/3 w-full items-center flex">
                        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-full" />
                    </div>
                    <div className="md:w-1/3 md:flex hidden w-full items-center md:justify-end justify-center gap-3 md:border-l-2 md:border-l-zinc-300">
                        <div className="flex flex-col space-y-2">
                            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24" />
                            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32" />
                            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-28" />
                        </div>
                        <div className="w-[100px] h-[100px] bg-gradient-to-r from-gray-200 to-gray-300 rounded-full" />
                    </div>
                </div>
                
                {[...Array(4)].map((_, index) => (
                    <CategorySkeleton key={index} />
                ))}
                
                <div className="w-full p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-4" />
                    <div className="space-y-2">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full" />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};