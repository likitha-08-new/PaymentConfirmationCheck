document.addEventListener('DOMContentLoaded', function () {
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
                    "image_url": "https://tse3.mm.bing.net/th?id=OIP.r1_JUJ88yhZAZ_6uDLKhKAHaHa&pid=Api&P=0&h=180",
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
                    "image_url": "https://tse1.mm.bing.net/th?id=OIP.cZBifRXKCvsZguVf0_Q_CAHaHa&pid=Api&P=0&h=180",
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

    // Populate Order Summary
    const orderSummary = document.getElementById("order-summary");
    data.cart.items.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("flex", "items-center", "mb-6");
        itemDiv.innerHTML = `
            <img src="${item.image_url}" alt="${item.product_name}" class="w-16 h-16 object-cover rounded-lg mr-4">
            <div class="flex-1">
                <p class="text-lg font-semibold text-gray-800">${item.product_name}</p>
                <p class="text-sm text-gray-500">Qty: ${item.quantity}</p>
            </div>
            <p class="text-lg font-semibold text-gray-800">$${item.total_price.toFixed(2)}</p>
        `;
        orderSummary.appendChild(itemDiv);
    });

    // Populate Summary Details
    document.getElementById("subtotal").textContent = `$${data.cart.sub_total.toFixed(2)}`;
    document.getElementById("shipping_cost").textContent = `$${data.cart.shipping_cost.toFixed(2)}`;
    document.getElementById("total").textContent = `$${data.cart.grand_total.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${data.cart.total_tax.toFixed(2)}`;

    // Populate Thank You Section
    document.getElementById("order_id").textContent = data.checkout_id;
    document.getElementById("delivery_date").textContent = new Date(data.shipping_method.estimated_delivery).toLocaleDateString();

    // Set grand total on pay button
    document.getElementById("grand_total_button").textContent = data.cart.grand_total.toFixed(2);

    // Show/Hide Place Order button and Disclaimer based on Payment Method
    const codRadio = document.getElementById("cod");
    const cardRadio = document.getElementById("card");
    const cardDetails = document.getElementById("card-details");
    const payButton = document.getElementById("pay_button");
    const placeOrderButton = document.getElementById("place_order_button");
    const disclaimer = document.getElementById("disclaimer");

    // Load previously selected payment method
    const savedPaymentMethod = sessionStorage.getItem('paymentMethod');
    if (savedPaymentMethod === 'cod') {
        codRadio.checked = true;
        cardDetails.style.display = "none";
        payButton.style.display = "none";
        placeOrderButton.classList.remove("hidden");
        disclaimer.style.display = "block"; // Ensure disclaimer is displayed
    } else if (savedPaymentMethod === 'card') {
        cardRadio.checked = true;
        cardDetails.style.display = "block";
        payButton.style.display = "block";
        placeOrderButton.classList.add("hidden");
        disclaimer.style.display = "block"; // Ensure disclaimer is displayed
    }

    codRadio.addEventListener("change", () => {
        if (codRadio.checked) {
            cardDetails.style.display = "none";
            payButton.style.display = "none";
            placeOrderButton.classList.remove("hidden");
            disclaimer.style.display = "block"; // Show disclaimer
            sessionStorage.setItem('paymentMethod', 'cod');
        }
    });

    cardRadio.addEventListener("change", () => {
        if (cardRadio.checked) {
            cardDetails.style.display = "block";
            payButton.style.display = "block";
            placeOrderButton.classList.add("hidden");
            disclaimer.style.display = "block"; // Show disclaimer
            sessionStorage.setItem('paymentMethod', 'card');
        }
    });

    // Validate Card Number
    function validateCardNumber(cardNumber) {
        return /^\d{16}$/.test(cardNumber);
    }

    // Validate Expiry Date
    function validateExpiryDate(expiryDate) {
        const [month, year] = expiryDate.split('/').map(num => parseInt(num, 10));
        const today = new Date();
        const expiry = new Date(year + 2000, month - 1); // Assuming YY format for year
        return expiry >= today;
    }

    // Validate CVV
    function validateCVV(cvv) {
        return /^\d{3}$/.test(cvv);
    }

    // Save Card Details
    function saveCardDetails() {
        const cardNumber = document.getElementById("card_number").value.replace(/\s+/g, '');
        const expiryDate = document.getElementById("expiry_date").value;
        const cvv = document.getElementById("cvv").value;

        // Save the details in session storage
        sessionStorage.setItem('cardNumber', cardNumber);
        sessionStorage.setItem('expiryDate', expiryDate);
        sessionStorage.setItem('cvv', cvv);
    }

    // Populate Form with Saved Card Details
    window.addEventListener('load', () => {
        const cardNumber = sessionStorage.getItem('cardNumber');
        const expiryDate = sessionStorage.getItem('expiryDate');
        const cvv = sessionStorage.getItem('cvv');

        if (cardNumber) {
            document.getElementById("card_number").value = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
        }

        if (expiryDate) {
            document.getElementById("expiry_date").value = expiryDate;
        }

        if (cvv) {
            document.getElementById("cvv").value = cvv;
        }
    });

    // Handle Payment Button Click
    document.getElementById('pay_button').addEventListener('click', function() {
        // Get card details
        const cardNumber = document.getElementById("card_number").value.replace(/\s+/g, '');
        const expiryDate = document.getElementById("expiry_date").value;
        const cvv = document.getElementById("cvv").value;

        // Validate card details before proceeding
        if (!validateCardNumber(cardNumber)) {
            alert("Invalid card number. It should be exactly 16 digits.");
            return;
        }

        if (!validateExpiryDate(expiryDate)) {
            alert("Invalid expiry date. It should not be a past date.");
            return;
        }

        if (!validateCVV(cvv)) {
            alert("Invalid CVV. It should be exactly 3 numeric digits.");
            return;
        }

        // Save card details before redirecting
        saveCardDetails();

        // Redirect to confirm.html
        window.location.href = 'confirm.html';
    });

    // Handle Place Order Button Click
    document.getElementById('place_order_button').addEventListener('click', function() {
        // Redirect to confirm.html without validation
        window.location.href = 'confirm.html';
    });

    // Prevent the default form submission
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();
    });
});
