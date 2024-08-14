
    const data = {
        "checkout_id": "c456d2e7-45b3-492a-bdd3-8d8d234a670e",
        "created_at": "2024-08-13T12:34:56Z",
        "customer": {
            "customer_id": "123456",
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone": "+1234567890",
            "shipping_address": {
                "address_id": "654321",
                "first_name": "John",
                "last_name": "Doe",
                "company": "Example Corp",
                "address_line1": "123 Main St",
                "address_line2": "Apt 4B",
                "city": "New York",
                "state": "NY",
                "postal_code": "10001",
                "country": "USA"
            },
            "billing_address": {
                "address_id": "654322",
                "first_name": "John",
                "last_name": "Doe",
                "company": "Example Corp",
                "address_line1": "123 Main St",
                "address_line2": "Apt 4B",
                "city": "New York",
                "state": "NY",
                "postal_code": "10001",
                "country": "USA"
            }
        },
        "cart": {
            "items": [
                {
                    "item_id": "prod_001",
                    "product_name": "Wireless Headphones",
                    "image_url": "https://tse3.mm.bing.net/th?id=OIP.r1_JUJ88yhZAZ_6uDLKhKAHaHa&pid=Api&P=0&h=180", // Product image URL
                    "quantity": 2,
                    "price": 99.99,
                    "discount": {
                        "type": "percentage",
                        "value": 10,
                        "applied_value": 19.998
                    },
                    "tax": {
                        "type": "percentage",
                        "value": 8.875,
                        "applied_value": 14.135
                    },
                    "total_price": 194.122
                },
                {
                    "item_id": "prod_002",
                    "product_name": "Bluetooth Speaker",
                    "image_url": "https://tse1.mm.bing.net/th?id=OIP.cZBifRXKCvsZguVf0_Q_CAHaHa&pid=Api&P=0&h=180", // Product image URL
                    "quantity": 1,
                    "price": 149.99,
                    "discount": {
                        "type": "fixed",
                        "value": 20.00,
                        "applied_value": 20.00
                    },
                    "tax": {
                        "type": "percentage",
                        "value": 8.875,
                        "applied_value": 11.496
                    },
                    "total_price": 141.486
                }
            ],
            "sub_total": 336.00,
            "shipping_cost": 15.00,
            "total_discount": 39.998,
            "total_tax": 25.631,
            "grand_total": 295.62
        },
        "shipping_method": {
            "shipping_id": "ship_001",
            "name": "Standard Shipping",
            "cost": 15.00,
            "estimated_delivery": "2024-08-20T00:00:00Z"
        },
        "discounts": [
            {
                "discount_id": "disc_001",
                "type": "percentage",
                "description": "Summer Sale - 10% off on Wireless Headphones",
                "value": 10,
                "applied_value": 19.998
            },
            {
                "discount_id": "disc_002",
                "type": "fixed",
                "description": "Loyalty Discount - $20 off on Bluetooth Speaker",
                "value": 20.00,
                "applied_value": 20.00
            }
        ],
        "tax_details": [
            {
                "tax_id": "tax_001",
                "type": "sales_tax",
                "description": "State Sales Tax",
                "rate": 8.875,
                "applied_value": 25.631
            }
        ],
        "order_notes": "Please leave the package at the front door.",
        "status": "Pending",
        "updated_at": "2024-08-13T12:45:00Z"
    };

    // Populate the order confirmation ID
    document.getElementById('confirmation_id').textContent = `Order ID: ${data.checkout_id}`;

    // Populate contact information
    const customer = data.customer;
    document.getElementById('contact_info').innerHTML = `
        ${customer.first_name} ${customer.last_name}<br>
        ${customer.email}<br>
        ${customer.phone}
    `;

    // Populate shipping address
    const shippingAddress = customer.shipping_address;
    document.getElementById('shipping_address').innerHTML = `
        ${shippingAddress.first_name} ${shippingAddress.last_name}<br>
        ${shippingAddress.company}<br>
        ${shippingAddress.address_line1}, ${shippingAddress.address_line2}<br>
        ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postal_code}<br>
        ${shippingAddress.country}
    `;

    // Populate shipping method
    const shippingMethod = data.shipping_method;
    document.getElementById('shipping_method').innerHTML = `
        ${shippingMethod.name}<br>
        Estimated Delivery: ${new Date(shippingMethod.estimated_delivery).toLocaleDateString()}<br>
        Cost: $${shippingMethod.cost.toFixed(2)}
    `;

    // Populate billing address
    const billingAddress = customer.billing_address;
    document.getElementById('billing_address').innerHTML = `
        ${billingAddress.first_name} ${billingAddress.last_name}<br>
        ${billingAddress.company}<br>
        ${billingAddress.address_line1}, ${billingAddress.address_line2}<br>
        ${billingAddress.city}, ${billingAddress.state} ${billingAddress.postal_code}<br>
        ${billingAddress.country}
    `;

    // Populate order summary
    const cart = data.cart;
    const orderSummary = document.getElementById('order-summary');
    orderSummary.innerHTML = '';
    cart.items.forEach(item => {
        orderSummary.innerHTML += `
            <div class="mb-4">
                <div class="flex items-center">
                    <img src="${item.image_url}" alt="${item.product_name}" class="w-12 h-12 mr-4 rounded">
                    <div>
                        <h4 class="font-semibold text-gray-700">${item.product_name}</h4>
                        <p class="text-gray-600">Quantity: ${item.quantity}</p>
                        <p class="text-gray-600">Price: $${item.price.toFixed(2)}</p>
                        <p class="text-gray-600">Discount: $${item.discount.applied_value.toFixed(2)}</p>
                        <p class="text-gray-600">Tax: $${item.tax.applied_value.toFixed(2)}</p>
                        <p class="text-gray-700 font-semibold">Total: $${item.total_price.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `;
    });

    // Populate order totals
    document.getElementById('subtotal').textContent = `$${cart.sub_total.toFixed(2)}`;
    document.getElementById('shipping_cost').textContent = `$${cart.shipping_cost.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${cart.total_tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${cart.grand_total.toFixed(2)}`;

