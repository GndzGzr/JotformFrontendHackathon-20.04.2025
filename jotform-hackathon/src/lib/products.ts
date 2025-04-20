// src/lib/products.ts
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

export async function checkout(name: string, address: string, products: any[]) {
    // Create form data for submission
    const formData = new URLSearchParams();
    
    // Add required Jotform fields
    formData.append('formID', FORM_ID);
    formData.append('simple_fpc', '63');
    formData.append('payment_version', '4');
    formData.append('simple_spc', `${FORM_ID}-${FORM_ID}`);
    formData.append('event_id', `${Date.now()}_${FORM_ID}_${Math.random().toString(36).substring(2, 10)}`);
    
    // Add customer information using the submission[] format
    formData.append('submission[1]', name);
    formData.append('submission[2_first]', address);
    formData.append('submission[2_last]', name);
    
    // Calculate total amount
    const total = products.reduce((sum, product) => sum + (Number(product.price) * product.quantity), 0);
    
    // Add payment information
    formData.append('payment_total_checksum', total.toString());
    formData.append('payment_discount_value', '0');
    
    // Create the selectedProductsList structure
    const selectedProductsObj: any = {};
    
    // Set up product data
    try {
        // Get all products to set default quantities
        const allProductsResponse = await getProducts();
        const allProductsList = allProductsResponse?.content?.products || [];
        
        // Create a product data object
        const productData: any = {};
        
        // Set default quantity 0 for all known products
        allProductsList.forEach((product: any) => {
            if (product.pid) {
                productData[`special_${product.pid}`] = { "item_0": "0" };
            }
        });
        
        // Add products from cart and update the selectedProductsList
        products.forEach((product) => {
            // Update product quantities
            productData[`special_${product.pid}`] = { "item_0": product.quantity.toString() };
            
            // Add to selectedProductsList object
            selectedProductsObj[product.pid] = {
                "0": {
                    "customOptionValues": {"0": "1"},
                    "quantity": product.quantity
                }
            };
            
            // Add product IDs
            formData.append('submission[63_ids][]', product.pid);
        });
        
        // Add product data as JSON
        formData.append('submission[63]', JSON.stringify(productData));
        
        // Add selected products data needed for Jotform
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
        const res = await fetch(`https://api.jotform.com/form/${FORM_ID}/submissions?apiKey=${API_KEY}`, {
            method: "POST",
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json' // Changed to accept JSON response
            }
        });
        
        // Parse the response as JSON
        const responseData = await res.json();
        
        // Check if the response is successful based on the JSON structure
        if (!res.ok || responseData.responseCode !== 200) {
            throw new Error(`Submission failed: ${responseData.message || JSON.stringify(responseData)}`);
        }
        
        // Return success with the response data
        return { 
            success: true, 
            message: "Order successfully submitted",
            data: responseData.content // Include the content from the API response
        };
    } catch (error) {
        console.error('Checkout error:', error);
        throw error;
    }
}