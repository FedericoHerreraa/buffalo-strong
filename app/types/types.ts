import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { LoginFormData, RegisterFormData } from "@/app/schemas/schemas";

export interface ProductCart {
    id: number;
    title: string;
    description: string;
    sugestedPrice: number;
    listPrice: number;
    created_at: string;
    category: string;
    stock: number;
    brand: string;
    img: string[];
    color: string;
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
    category: string;
    stock: number;
    brand: string;
    img: string[];
    listCode: number;
    color: string;
    group: string;
}

export interface CartContextType {
    cart: ProductCart[];
    setCart: (cart: ProductCart[]) => void;
    addToCart: (product: ProductCart) => void;
    removeFromCart: (product: ProductCart) => void;
    deleteOne: (id: number) => void;
    incrementOne: (id: number) => void;
    decrementOne: (id: number) => void;
    totalPurchase: () => number;
    cleanCart: () => void;
    updateStock: (cart: ProductCart[]) => void;
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
    login: (email: string, password: string) => Promise<string | undefined>;
    createUser: (email: string, name: string, password: string, cuit: number, address: string, role: string) => Promise<string | undefined>;
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
        cuit2: string;
    }>
    handleSubmit: UseFormHandleSubmit<{
        name: string;
        email: string;
        address: string;
        lastName: string;
        cuit: string;
        cuit2: string;
    }, undefined>
    onSubmit: (data: RegisterFormData) => Promise<void>
    errors: FieldErrors<{
        name: string;
        lastName: string;
        email: string;
        address: string;
        cuit: string;
        cuit2: string;
    }>
    isSubmitting: boolean;
    error: string | null;
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
    error: string | null;
    isSubmitting: boolean;
    loginUser: (data: LoginFormData) => void;
    isMobile: boolean;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}