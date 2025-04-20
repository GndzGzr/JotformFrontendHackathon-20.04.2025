"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <h1 className="text-[128px] font-bold text-white">Guzars Shop</h1>
        <button onClick={() => router.push('/products')} className="bg-white text-black px-4 py-2 rounded-md">View Products</button>
        
      </main>
      
    </div>
  );
}
