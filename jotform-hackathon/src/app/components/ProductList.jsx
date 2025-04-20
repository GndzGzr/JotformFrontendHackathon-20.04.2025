


import ProductCard from "./ProductCard";

export default function ProductList({products}) {
    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.pid} product={product} />
            ))}
        </div>
    )
}

