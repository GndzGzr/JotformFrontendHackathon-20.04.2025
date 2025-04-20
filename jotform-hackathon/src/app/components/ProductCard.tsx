"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
export default function ProductCard({key, product}: {key: any, product: any}) {
    const router = useRouter();
    const imagesArray = JSON.parse(product.images);
    const imageUrl = imagesArray[0];
    
    return (
        <div key={key} className="border rounded-lg p-4 shadow hover:bg-gray-700" onClick={() => {
            router.push(`/products/${product.pid}`);
          }}>
            <Image src={imageUrl} alt={product.name} width={100} height={100} />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            {product.description && <p className="mt-2">{product.description}</p>}
          </div>
    )
}
