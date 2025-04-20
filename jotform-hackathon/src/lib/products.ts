const API_KEY = "90a4bbbfa4d879c0578c4202f440361d"
const FORM_ID = "251073657795973"

const getProducts = async () => {
    const res = await fetch(`https://api.jotform.com/form/${FORM_ID}/payment-info?apiKey=${API_KEY}`);
    const data = await res.json();
    return data;
}

const getProductById = async (id: string) => {
    const res = await fetch(`https://api.jotform.com/form/${FORM_ID}/payment-info/${id}?apiKey=${API_KEY}`);
    const data = await res.json();
    const jsonString = JSON.stringify(data);
    return jsonString;
}

export default getProducts;



