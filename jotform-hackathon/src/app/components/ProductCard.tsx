export default function ProductCard({product}: {product: any}) {
    return (
        <div>
            <h1>Product Card</h1>
            <p>{product.cid}: {product.description}</p>
          
            
        </div>
    )
}
