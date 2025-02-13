
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
    role: string,
    cuit: number,
    address: string,
}

export interface AuthContextType {
    user: User | null | undefined;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, cuit: number, address: string) => void;
    logOut: () => void;
    loadProfile: () => void;
}