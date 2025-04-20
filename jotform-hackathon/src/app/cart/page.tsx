"use client";

import { useCart } from "../context/cartContext";

export default function Cart() {
    const { cart } = useCart();
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        
        {cart.map((item) => (
            <div key={item.pid}>
                <h2>{item.name}</h2>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
            </div>
        ))}
        
      </main>
      
    </div>
    )
}
