

import Image from "next/image";
import { getProductById } from "@/lib/products";
import CartIcon from "@/app/components/CartIcon";
import AddtoCartBtn from "@/app/components/AddtoCartBtn";
export default async function Product({params}: {params: {id: string}}) {
  
  
    const resolvedParams = await params;
    const productId = resolvedParams.id;
    const product = await getProductById(productId);

    const imagesArray = JSON.parse(product.images);
    const imageUrl = imagesArray[0];
    

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <CartIcon />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start color-white">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-1">
            <Image src={imageUrl} alt={product.name} width={500} height={500} />
          </div>
          <div className="col-span-1">
            <h1 className="text-2xl font-medium text-gray-400">About this product</h1>
            <h1 className="mt-4 font-medium text-lg">{product.description}</h1>
            <h1 className="mt-8 font-bold text-4xl">${product.price}</h1>
            <AddtoCartBtn product={product} />
            
          </div>

        </div>
        
        
      </main>
    </div>
  );
}
