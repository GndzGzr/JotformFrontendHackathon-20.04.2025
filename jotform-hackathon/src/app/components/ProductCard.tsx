"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import { useCart } from "../context/cartContext";

export default function ProductCard({key, product}: {key: any, product: any}) {
    const router = useRouter();
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const imagesArray = JSON.parse(product.images);
    const imageUrl = imagesArray[0];


    return (
        <div key={key} className="border rounded-lg p-4 shadow hover:bg-gray-700">
            <Image src={imageUrl} alt={product.name} width={100} height={100} />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            {product.description && <p className="mt-2">{product.description}</p>}
            <button onClick={() => addToCart(product)} disabled={isAdding} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">ADD</button>
        </div>
    )

}
