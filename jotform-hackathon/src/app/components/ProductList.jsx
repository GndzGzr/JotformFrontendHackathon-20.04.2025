


import ProductCard from "./ProductCard";

export default function ProductList({products}) {
    return (
        <div className="flex flex-wrap gap-[32px]">
            {products.map((product) => (
                <ProductCard key={product.pid} product={product} />
            ))}
        </div>
    )
}

