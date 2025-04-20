// src/app/components/CartIcon.tsx
"use client";

import { useCart } from "../context/cartContext";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

export default function CartIcon() {
    const { totalItems } = useCart();
    const router = useRouter();
    
    return (
        <button 
            onClick={() => router.push('/cart')}
            className="relative p-2"
            aria-label="Cart"
        >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                </span>
            )}
        </button>
    );
}