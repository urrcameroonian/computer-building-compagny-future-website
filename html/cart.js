// cart.js

const cart = [];

function addToCart(productId, category) {
    const product = products[category].find(p => p.id === parseInt(productId));
    cart.push(product);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price}`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCartDisplay();
        });
        listItem.appendChild(removeButton);
        cartList.appendChild(listItem);
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("total-price").textContent = `Total: $${totalPrice}`;
}

document.getElementById('add-to-cart').addEventListener('click', function() {
    const cpuId = document.getElementById('cpu-select').value;
    const gpuId = document.getElementById('gpu-select').value;
    const ramId = document.getElementById('ram-select').value;

    if (cpuId && gpuId && ramId) {
        addToCart(cpuId, 'cpu');
        addToCart(gpuId, 'gpu');
        addToCart(ramId, 'ram');
    } else {
        alert('Please select all parts before adding to cart.');
    }
});
