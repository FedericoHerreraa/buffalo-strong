
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
    img: [string];
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
    img: [string];
    listCode: number;
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
    register: (email: string, name: string, password: string, cuit: number, address: string) => void;
    logOut: () => void;
    loading: boolean;
}

export interface RegisterViewProps {
    formData: {
        name: string;
        lastName: string;
        email: string;
        address: string;
        fiscalKey: string;
        fiscalKeyRepeat: string;
    };
    loading: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}