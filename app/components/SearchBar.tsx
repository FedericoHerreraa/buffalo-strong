
import { TfiSearch } from "react-icons/tfi";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";


export const SearchBar = () => {
    const [input, setInput] = useState<string>("");
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        if (input) {
            params.set("search", input)
        } else {
            params.delete("search")
        }
        setTimeout(() => {
            router.push(`?${params.toString()}`, { scroll: false });
        }, 700)
    }, [input, router, searchParams])

    return (
        <div className="relative w-3/5 rounded-lg">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Buscá tu producto por nombre aquí..."
                className="w-full bg-white md:px-4 px-2 md:py-2 py-1 md:text-base text-sm md:rounded-lg rounded-md placeholder:text-[#5d3a1f] focus:outline-none border border-zinc-300"
            />
            <TfiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8d572f] cursor-pointer md:size-5 size-3" />
        </div>
    )
}