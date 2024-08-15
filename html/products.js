// products.js

const products = {
    cpu: [
        { id: 1, name: "Intel Core i9-13900K", price: 529 },
        { id: 2, name: "AMD Ryzen 9 7950X", price: 599 },
        // Add more CPUs
    ],
    gpu: [
        { id: 1, name: "NVIDIA GeForce RTX 4090", price: 1499 },
        { id: 2, name: "AMD Radeon RX 7900 XTX", price: 999 },
        // Add more GPUs
    ],
    ram: [
        { id: 1, name: "Corsair Vengeance 32GB DDR5", price: 200 },
        { id: 2, name: "G.SKILL Trident Z5 32GB DDR5", price: 220 },
        // Add more RAM
    ],
    // Add other product categories
};

function populateProductOptions(category, selectElementId) {
    const selectElement = document.getElementById(selectElementId);
    products[category].forEach(product => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = `${product.name} - $${product.price}`;
        selectElement.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    populateProductOptions("cpu", "cpu-select");
    populateProductOptions("gpu", "gpu-select");
    populateProductOptions("ram", "ram-select");
});
