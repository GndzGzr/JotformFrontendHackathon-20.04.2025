// src/app/context/CartContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CartItem = {
    pid: string;
    name: string;
    price: number;
    images: string;
    quantity: number;
    [key: string]: any;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Load cart from localStorage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage", error);
                setCart([]);
            }
        }
    }, []);

    // Update totals whenever cart changes
    useEffect(() => {
        const items = cart.reduce((total, item) => total + item.quantity, 0);
        setTotalItems(items);

        const price = cart.reduce((total, item) => {
            return total + (Number(item.price) * item.quantity);
        }, 0);
        setTotalPrice(price);

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: any) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.pid === product.pid);
            
            if (existingProductIndex >= 0) {
                // Create a new array with the updated quantity
                const newCart = [...prevCart];
                newCart[existingProductIndex] = {
                    ...newCart[existingProductIndex],
                    quantity: newCart[existingProductIndex].quantity + 1
                };
                console.log(newCart);
                return newCart;
            } else {
                // Add new product to cart
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.pid !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart(prevCart => 
            prevCart.map(item => 
                item.pid === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}