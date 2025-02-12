'use client'

import { createContext, useContext, useState } from "react";
import { CartContextType, ProductCart } from "@/app/types/types";

const CartContext = createContext<CartContextType>({
    cart: [] as ProductCart[],
    setCart: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    deleteOne: () => {},
});

export const CartProvider = ({ children } : { children: React.ReactNode }) => {
    const [cart, setCart] = useState<ProductCart[]>([]);

    const addToCart = (product: ProductCart) => {
        setCart([...cart, product]);
    }

    const removeFromCart = (product: ProductCart) => {
        setCart(cart.filter((item: ProductCart) => item.id !== product.id));
    }

    const deleteOne = (id: number) => {
        setCart(cart.filter((product) => product.id !== id))
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, deleteOne }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}