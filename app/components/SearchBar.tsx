'use client'

import { TfiSearch } from "react-icons/tfi";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useMobileView } from "../context/MobileContext";

export const SearchBar = () => {
    const [input, setInput] = useState<string>("");
    const { isMobile } = useMobileView()
    const searchParams = useSearchParams();
    const router = useRouter();

    const scrollToSection = () => {
        const element = document.getElementById('products');
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    useEffect(() => {
        const searchQuery = searchParams.get("search") || "";
        setInput(searchQuery);
    }, [searchParams])

    const debouncedSetSearch = useDebouncedCallback((input: string) => {
        const params = new URLSearchParams(searchParams);
        if (input) {
            params.set("search", input);
        } else {
            params.delete("search");
        }
        router.push(`?${params.toString()}`, { scroll: false });
    }, 300); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        scrollToSection()
        setInput(e.target.value);
        debouncedSetSearch(e.target.value);
    };

    return (
        <div className="relative md:w-3/5 w-3/4 rounded-sm">
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={isMobile ? 'Buscar productos' : 'Buscá tu producto por nombre aquí...'}
                className="w-full bg-white md:px-4 px-2 md:py-2 py-1 border-r border-r-zinc-300 md:text-base text-sm rounded-sm placeholder:text-[#5d3a1f] focus:outline-none border border-zinc-300"
            />
            <TfiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8d572f] cursor-pointer md:size-5 size-3" />
        </div>
    );
};