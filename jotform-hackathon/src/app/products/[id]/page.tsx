import Image from "next/image";
import { getProductById } from "@/lib/products";

export default async function Product({params}: {params: {id: string}}) {
    const resolvedParams = await params;
    const productId = resolvedParams.id;
    const product = await getProductById(productId);
    

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start color-white">
        <h1>{product.description}</h1>
        <p>{product.price}</p>
        <button>Buy Now</button>
      </main>
    </div>
  );
}
