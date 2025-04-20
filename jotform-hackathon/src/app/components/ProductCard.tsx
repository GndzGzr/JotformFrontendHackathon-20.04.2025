"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import { useCart } from "../context/cartContext";

export default function ProductCard({
  key,
  product,
}: {
  key: any;
  product: any;
}) {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const imagesArray = JSON.parse(product.images);
  const imageUrl = imagesArray[0];

  return (
    <div key={key} className="border rounded-lg shadow overflow-hidden relative cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        

    >
        <div onClick={() => router.push(`/products/${product.pid}`)}>
        <div className="relative w-full h-64 mb-4 mt-4 overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "contain",              
          }}
          className="rounded-md"
        />
        
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
      </div>
            
        </div>
      
      
      <div className={`absolute inset-0 bg-black bg-opacity-85 dark:bg-gray-600 flex flex-col p-8 transition-transform duration-300 ease-in-out ${
          hover ? 'translate-y-0' : '-translate-x-full'
        }`}>
            <p className="text-white ">{product.description}</p>
            <p className="text-white">${product.price}</p>
            <button onClick={() => addToCart(product)} disabled={isAdding} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">ADD</button>

      </div>
      

      
      
    </div>
  );
}
