'use client'

import { createContext, useContext, useState } from "react";
import { CartContextType, ProductCart } from "@/app/types/types";

const CartContext = createContext<CartContextType>({
    cart: [] as ProductCart[],
    addToCart: () => {},
    removeFromCart: () => {}
});

export const CartProvider = ({ children } : { children: React.ReactNode }) => {
    const [cart, setCart] = useState<ProductCart[]>([]);

    const addToCart = (product: ProductCart) => {
        setCart([...cart, product]);
    }

    const removeFromCart = (product: ProductCart) => {
        setCart(cart.filter((item: ProductCart) => item.id !== product.id));
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
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