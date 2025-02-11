

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
    addToCart: (product: ProductCart) => void;
    removeFromCart: (product: ProductCart) => void;
}