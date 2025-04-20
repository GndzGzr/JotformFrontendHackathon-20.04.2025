import Image from "next/image";
import getProducts from "@/lib/products";

export default async function Products() {
  const response = await getProducts();
  const products = response?.content?.products || [];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>Hello Products!</p>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {products.map((product: any, index: any) => (
              <div key={index} className="border rounded-lg p-4 shadow">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">${product.price}</p>
                {product.description && <p className="mt-2">{product.description}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
