// order.js

document.getElementById("checkout-button").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const orderDetails = {
        items: cart,
        totalPrice: cart.reduce((sum, item) => sum + item.price, 0),
    };

    // This is where you'd process the order, e.g., save it to a database or send it to your backend

    alert("Order placed successfully!");
    // Reset the cart after placing the order
    cart.length = 0;
    updateCartDisplay();
});
