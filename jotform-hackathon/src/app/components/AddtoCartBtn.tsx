"use client";

import { useCart } from "../context/cartContext";

export default function AddtoCartBtn({product}: {product: any}) {
    const { addToCart } = useCart();
  return (
    <button onClick={() => addToCart(product)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">ADD</button>
  );
}


