// src/lib/products.ts
const API_KEY = "90a4bbbfa4d879c0578c4202f440361d"
const FORM_ID = "251073585525964"

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

export async function checkout(name: string, address: string, products: any[]) {
    // Create form data for submission
    const formData = new URLSearchParams();
    

    // Add customer information
    formData.append('q65_fullName', name);
    formData.append('q66_typeA66', address);
    
    // Calculate total amount
    const total = products.reduce((sum, product) => sum + (Number(product.price) * product.quantity), 0);
    
    // Add payment information
    formData.append('payment_total_checksum', total.toString());
    formData.append('payment_discount_value', '0');
    
    // Create the selectedProductsList structure
    const selectedProductsObj: any = {};
    
    // Add products information as required by Jotform
    products.forEach((product) => {
        // THIS IS THE KEY PART - adding each product ID in the format q63_myProducts[][id]
        formData.append(`q63_myProducts[][id]`, product.pid);
        
        // Also build the selectedProductsList object
        selectedProductsObj[product.pid] = {
            "0": {
                "customOptionValues": {"0": "1"},
                "quantity": product.quantity
            }
        };
    });
    
    // Convert the selectedProductsList to JSON and add it to the form data
    formData.append('selectedProductsList', JSON.stringify([selectedProductsObj]));
    formData.append('paymentFieldsToSelectedProducts', JSON.stringify([selectedProductsObj]));
    
    // Add payment summary
    const paymentSummary = {
        "shipping": "0.00",
        "shipping_discounted": "0.00",
        "subtotal_discounted": total.toFixed(2),
        "tax": "0.00",
        "tax_discounted": "0.00",
        "subtotal": total.toFixed(2),
        "total": total.toFixed(2),
        "discount": "0.00"
    };
    formData.append('paymentSummary', JSON.stringify(paymentSummary));
    
    // Add any additional required fields
    formData.append('website', '');
    formData.append('submitSource', 'form');
    formData.append('timeToSubmit', '16');
    formData.append('surchargeData', '{}');
    
    console.log("Form data being sent:", Object.fromEntries(formData));
    
    // Submit the form
    try {
        const res = await fetch(`https://submit.jotform.com/submit/${FORM_ID}`, {
            method: "POST",
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html' // Changed to accept HTML response
            }
        });
        
        // Check if the response is OK
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Submission failed with status ${res.status}: ${errorText}`);
        }
        
        // Get the response as text since it's HTML
        const responseText = await res.text();
        
        // Check if the response contains success indicators
        if (responseText.includes('Thank You') || responseText.includes('has been received')) {
            return { 
                success: true, 
                message: "Order successfully submitted" 
            };
        } else {
            throw new Error("Submission response did not contain expected success message");
        }
    } catch (error) {
        console.error('Checkout error:', error);
        throw error;
    }
}