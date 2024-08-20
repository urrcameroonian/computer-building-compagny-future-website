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
    storage: [
        { id: 1, name: "Samsung 980 Pro 1TB NVMe SSD", price: 129 },
        { id: 2, name: "Western Digital Blue 1TB HDD", price: 49 },
        // Add more storage options
    ],
    cpuCooler: [
        { id: 1, name: "Noctua NH-D15", price: 89 },
        { id: 2, name: "Corsair iCUE H150i", price: 159 },
        // Add more CPU coolers
    ],
    motherboard: [
        { id: 1, name: "ASUS ROG Strix Z790-E", price: 399 },
        { id: 2, name: "MSI MPG B550 Gaming Edge", price: 199 },
        // Add more motherboards
    ],
    case: [
        { id: 1, name: "NZXT H510", price: 99 },
        { id: 2, name: "Fractal Design Meshify C", price: 109 },
        // Add more cases
    ],
    powerSupply: [
        { id: 1, name: "Corsair RM850x", price: 129 },
        { id: 2, name: "EVGA SuperNOVA 750 G5", price: 119 },
        // Add more power supplies
    ],
    os: [
        { id: 1, name: "Windows 11 Home", price: 139 },
        { id: 2, name: "Ubuntu (Free)", price: 0 },
        // Add more OS options
    ],
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
    populateProductOptions("storage", "storage-select");
    populateProductOptions("cpuCooler", "cpu-cooler-select");
    populateProductOptions("motherboard", "motherboard-select");
    populateProductOptions("case", "case-select");
    populateProductOptions("powerSupply", "power-supply-select");
    populateProductOptions("os", "os-select");
});
