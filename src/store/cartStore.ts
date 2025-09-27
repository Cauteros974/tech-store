import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product{
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    description: string;
}

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}