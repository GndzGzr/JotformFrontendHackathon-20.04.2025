
import Image from "next/image";
import { getProducts } from "@/lib/products";
import ProductList from "../components/ProductList";
import CartIcon from "../components/CartIcon";
export default async function Products() {
  const response = await getProducts();
  const products = response?.content?.products || [];
  
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 mx-32 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <CartIcon />  
        <h1 className="text-2xl font-bold">Products</h1>
        
          <ProductList products={safeProducts} />
        
      </main>
    </div>
  );
}
