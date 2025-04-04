'use client'

import { createContext, useContext, useState } from "react";
import { CartContextType, ProductCart } from "@/app/types/types";
import { supabase } from "@/lib/supabaseClient";

const CartContext = createContext<CartContextType>({
    cart: [] as ProductCart[],
    setCart: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    deleteOne: () => {},
    incrementOne: () => {},
    decrementOne: () => {},
    totalPurchase: () => 0,
    cleanCart: () => {},
    updateStock: () => {}
});

export const CartProvider = ({ children } : { children: React.ReactNode }) => {
    const [cart, setCart] = useState<ProductCart[]>([]);

    const addToCart = (product: ProductCart) => {
        const productInCart = cart.find((item: ProductCart) => item.id === product.id);
        if (productInCart) {
            setCart(cart.map((item: ProductCart) => item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item));
            return;
        }
        setCart([...cart, product]);
    }

    const removeFromCart = (product: ProductCart) => {
        setCart(cart.filter((item: ProductCart) => item.id !== product.id));
    }

    const deleteOne = (id: number) => {
        setCart(cart.filter((product) => product.id !== id))
    }

    const incrementOne = (id: number) => {
        setCart(cart.map((prod) => prod.id === id ? {...prod, quantity: prod.quantity + 1} : prod))
    }

    const decrementOne = (id: number) => {
        setCart(cart => 
            cart.map(prod => 
                prod.id === id 
                    ? { ...prod, quantity: prod.quantity - 1 } 
                    : prod
            ).filter(prod => prod.quantity > 0) 
        );
    }

    const cleanCart = () => {
        setCart([]);
    }

    const totalPurchase = () => {
        let total = 0;
        cart.map(prod => total += prod.listPrice * prod.quantity);
        return total;
    }

    const updateStock = (cart: ProductCart[]) => {
        cart.map(prod => {
            supabase
                .from('products')
                .update({ stock: prod.stock - prod.quantity })
                .eq('id', prod.id)
                .then(() => console.log('Stock actualizado'))
        }) 
    }

    return (
        <CartContext.Provider 
            value={{ 
                cart, 
                setCart, 
                addToCart, 
                removeFromCart, 
                deleteOne, 
                incrementOne, 
                decrementOne, 
                totalPurchase, 
                cleanCart, 
                updateStock 
            }}>
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