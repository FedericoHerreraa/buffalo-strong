import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { LoginFormData, RegisterFormData } from "@/app/schemas/schemas";

export interface ProductCart {
    id: number;
    title: string;
    description: string;
    sugestedPrice: number;
    listPrice: number;
    image: string;
    created_at: string;
    stock: number;
    brand: string;
    img: string[];
    quantity: number;
    listCode: number;
}

export interface ProductDB {
    id: number;
    title: string;
    description: string;
    sugestedPrice: number;
    listPrice: number;
    image: string;
    created_at: string;
    stock: number;
    brand: string;
    img: string[];
    listCode: number;
    imgByColor: ImageColor[];
    colors: string[];
}

type ImageColor = {
    img1: string;
    img2: string;
};

export interface CartContextType {
    cart: ProductCart[];
    setCart: (cart: ProductCart[]) => void;
    addToCart: (product: ProductCart) => void;
    removeFromCart: (product: ProductCart) => void;
    deleteOne: (id: number) => void;
    incrementOne: (id: number) => void;
    decrementOne: (id: number) => void;
    totalPurchase: () => number;
}

export interface User {
    id: string,
    created_at: string,
    email: string,
    name: string,
    role: string,
    cuit: number,
    address: string,
}

export interface AuthContextType {
    user: User | null | undefined;
    login: (email: string, password: string) => void;
    registerUser: (email: string, name: string, password: string, cuit: number, address: string) => void;
    logOut: () => void;
    loading: boolean;
}

export interface RegisterViewProps {
    register: UseFormRegister<{
        name: string;
        email: string;
        address: string;
        lastName: string;
        cuit: string;
    }>
    handleSubmit: UseFormHandleSubmit<{
        name: string;
        email: string;
        address: string;
        lastName: string;
        cuit: string;
    }, undefined>
    onSubmit: (data: RegisterFormData) => Promise<void>
    errors: FieldErrors<{
        name: string;
        lastName: string;
        email: string;
        address: string;
        cuit: string;
    }>
    isSubmitting: boolean;
}


export interface LoginViewProps {
    register: UseFormRegister<{
        email: string;
        password: string;
    }>
    handleSubmit: UseFormHandleSubmit<{
        email: string;
        password: string;
    }, undefined>
    errors: FieldErrors<{
        email: string;
        password: string;
    }>
    isSubmitting: boolean;
    loginUser: (data: LoginFormData) => void;
    isMobile: boolean;
}