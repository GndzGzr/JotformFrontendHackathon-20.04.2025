const API_KEY = "90a4bbbfa4d879c0578c4202f440361d"
const FORM_ID = "251073657795973"

export async function getProducts() {
    const res = await fetch(`https://api.jotform.com/form/${FORM_ID}/payment-info?apiKey=${API_KEY}`);
    const data = await res.json();
    return data;
}

export async function getProductById(id: string) {
    const allProducts = await getProducts();
    const productList = allProducts.content.products;
    const product = productList.find((p: any) => p.pid === id);
    return product;
}





