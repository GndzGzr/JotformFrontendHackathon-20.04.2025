


import ProductCard from "./ProductCard";

export default function ProductList({products}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
                <ProductCard key={product.pid} product={product} />
            ))}
        </div>
    )
}

