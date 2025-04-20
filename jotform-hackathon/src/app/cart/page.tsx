// src/app/cart/page.tsx
"use client";

import { useCart } from "../context/cartContext";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Trash2, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { checkout } from "@/lib/products";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    
    const handleCheckout = async () => {
        // Form validation
        if (!name.trim()) {
            setFormError("Please enter your name");
            return;
        }
        
        if (!address.trim()) {
            setFormError("Please enter your address");
            return;
        }
        
        if (cart.length === 0) {
            setFormError("Your cart is empty");
            return;
        }
        
        setIsSubmitting(true);
        setFormError("");
        
        try {
            // Call the checkout function from products.ts
            await checkout(name, address, cart);
            
            // Clear the cart after successful checkout
            clearCart();
            
            // Show success message or redirect
            alert("Your order has been placed successfully!");
        } catch (error) {
            console.error("Checkout error:", error);
            setFormError("There was an error processing your order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <p className="mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link 
                    href="/products" 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Continue shopping
                </Link>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen p-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {cart.map((item) => {
                        const imagesArray = JSON.parse(item.images);
                        const imageUrl = imagesArray[0];
                        
                        return (
                            <div key={item.pid} className="flex border-b py-4">
                                <div className="relative w-24 h-24 flex-shrink-0">
                                    <Image 
                                        src={imageUrl} 
                                        alt={item.name} 
                                        fill
                                        style={{objectFit: 'cover'}}
                                        className="rounded" 
                                    />
                                </div>
                                
                                <div className="ml-4 flex-grow">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-gray-600">${item.price}</p>
                                    
                                    <div className="flex items-center mt-2">
                                        <button 
                                            onClick={() => updateQuantity(item.pid, item.quantity - 1)}
                                            className="p-1 border rounded"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        
                                        <span className="mx-2">{item.quantity}</span>
                                        
                                        <button 
                                            onClick={() => updateQuantity(item.pid, item.quantity + 1)}
                                            className="p-1 border rounded"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-end">
                                    <span className="font-medium">
                                        ${(Number(item.price) * item.quantity).toFixed(2)}
                                    </span>
                                    
                                    <button 
                                        onClick={() => removeFromCart(item.pid)}
                                        className="text-red-500 mt-2"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    
                    <div className="flex justify-between mt-4">
                        <Link 
                            href="/products" 
                            className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Continue shopping
                        </Link>
                        
                        <button 
                            onClick={clearCart}
                            className="text-red-500 hover:text-red-700"
                        >
                            Clear cart
                        </button>
                    </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-min">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                    </div>
                    
                    <div className="border-t pt-2 mb-4">
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    {/* Shipping information form */}
                    <div className="mb-4">
                        <h3 className="font-medium mb-3">Shipping Information</h3>
                        
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="name" className="block text-sm mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="John Doe"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="address" className="block text-sm mb-1">Address</label>
                                <textarea
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="123 Main St, City, State, ZIP"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {formError && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                            {formError}
                        </div>
                    )}
                    
                    <button 
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        onClick={handleCheckout}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Checkout'}
                    </button>
                </div>
            </div>
        </div>
    );
}