// Example product data with compatibility attributes
const products = {
    cpu: [
        { id: 1, name: "Intel i7", price: 300, socket: "LGA1151", category: "cpu" },
        { id: 2, name: "AMD Ryzen 5", price: 200, socket: "AM4", category: "cpu" }
    ],
    motherboard: [
        { id: 1, name: "ASUS Prime", price: 150, socket: "LGA1151", ramType: "DDR4", category: "motherboard" },
        { id: 2, name: "MSI B450", price: 100, socket: "AM4", ramType: "DDR4", category: "motherboard" }
    ],
    ram: [
        { id: 1, name: "Corsair Vengeance", price: 80, type: "DDR4", category: "ram" }
    ],
    // Add other product categories like GPU, storage, CPU cooler, case, power supply, and OS similarly
};

const cart = [];

const compatibilityRules = {
    cpu: {
        motherboard: function(cpu, motherboard) {
            return cpu.socket === motherboard.socket;
        }
    },
    ram: {
        motherboard: function(ram, motherboard) {
            return ram.type === motherboard.ramType;
        }
    },
    // Add more compatibility rules here as needed
};

// Initialize dropdowns with all options
function initializeDropdowns() {
    populateDropdown('cpu');
    populateDropdown('motherboard');
    populateDropdown('ram');
    populateDropdown('gpu');
    populateDropdown('storage');
    populateDropdown('cpuCooler');
    populateDropdown('case');
    populateDropdown('powerSupply');
    populateDropdown('os');
}

// Populate a dropdown with all available options
function populateDropdown(category) {
    const dropdown = document.getElementById(`${category}-select`);
    dropdown.innerHTML = ''; // Clear existing options
    products[category].forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        dropdown.appendChild(option);
    });
}

// Filter parts based on selected parts
function filterParts(changedCategory) {
    const selectedCpu = products.cpu.find(p => p.id === parseInt(document.getElementById('cpu-select').value));
    const selectedMotherboard = products.motherboard.find(p => p.id === parseInt(document.getElementById('motherboard-select').value));

    if (changedCategory === 'cpu' && selectedCpu) {
        // Filter motherboard options based on selected CPU's socket
        const compatibleMotherboards = products.motherboard.filter(mb => mb.socket === selectedCpu.socket);
        updateDropdown('motherboard', compatibleMotherboards);
    } else if (changedCategory === 'motherboard' && selectedMotherboard) {
        // Filter CPU options based on selected motherboard's socket
        const compatibleCpus = products.cpu.filter(cpu => cpu.socket === selectedMotherboard.socket);
        updateDropdown('cpu', compatibleCpus);
        // Filter RAM options based on selected motherboard's RAM type
        const compatibleRam = products.ram.filter(ram => ram.type === selectedMotherboard.ramType);
        updateDropdown('ram', compatibleRam);
    }

    // Add similar filtering logic for other parts
}

// Update dropdown with filtered options
function updateDropdown(category, compatibleProducts) {
    const dropdown = document.getElementById(`${category}-select`);
    dropdown.innerHTML = ''; // Clear existing options
    compatibleProducts.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        dropdown.appendChild(option);
    });
}

function addToCart() {
    const selectedCpu = products.cpu.find(p => p.id === parseInt(document.getElementById('cpu-select').value));
    const selectedMotherboard = products.motherboard.find(p => p.id === parseInt(document.getElementById('motherboard-select').value));
    const selectedRam = products.ram.find(p => p.id === parseInt(document.getElementById('ram-select').value));
    const selectedGpu = products.gpu.find(p => p.id === parseInt(document.getElementById('gpu-select').value));
    const selectedStorage = products.storage.find(p => p.id === parseInt(document.getElementById('storage-select').value));
    const selectedCpuCooler = products.cpuCooler.find(p => p.id === parseInt(document.getElementById('cpu-cooler-select').value));
    const selectedCase = products.case.find(p => p.id === parseInt(document.getElementById('case-select').value));
    const selectedPowerSupply = products.powerSupply.find(p => p.id === parseInt(document.getElementById('power-supply-select').value));
    const selectedOs = products.os.find(p => p.id === parseInt(document.getElementById('os-select').value));

    cart.push(selectedCpu, selectedMotherboard, selectedRam, selectedGpu, selectedStorage, selectedCpuCooler, selectedCase, selectedPowerSupply, selectedOs);
    updateCartDisplay();
    updateCompatibilityChart();
}

function updateCartDisplay() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price}`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("neon-button");
        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCartDisplay();
            updateCompatibilityChart();
        });
        listItem.appendChild(removeButton);
        cartList.appendChild(listItem);
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("total-price").textContent = `Total: $${totalPrice}`;
}

function updateCompatibilityChart() {
    const compatibilityChart = document.getElementById("compatibility-chart");
    const issues = checkCompatibility();

    compatibilityChart.innerHTML = ''; // Clear previous content

    if (issues.length > 0) {
        issues.forEach(issue => {
            const issueElement = document.createElement("p");
            issueElement.textContent = issue;
            issueElement.style.color = 'red';
            compatibilityChart.appendChild(issueElement);
        });
    } else {
        const successElement = document.createElement("p");
        successElement.textContent = 'All parts are compatible!';
        successElement.style.color = 'green';
        compatibilityChart.appendChild(successElement);
    }
}

function checkCompatibility() {
    const issues = [];

    const selectedCpu = cart.find(item => item.category === 'cpu');
    const selectedMotherboard = cart.find(item => item.category === 'motherboard');
    const selectedRam = cart.find(item => item.category === 'ram');

    if (selectedCpu && selectedMotherboard && !compatibilityRules.cpu.motherboard(selectedCpu, selectedMotherboard)) {
        issues.push('The selected CPU is not compatible with the motherboard.');
    }

    if (selectedMotherboard && selectedRam && !compatibilityRules.ram.motherboard(selectedRam, selectedMotherboard)) {
        issues.push('The selected RAM is not compatible with the motherboard.');
    }

    // Add more compatibility checks as needed

    return issues;
}

// Initialize dropdowns on page load
initializeDropdowns();

// Add event listener to "Add to Cart" button
document.getElementById("add-to-cart").addEventListener("click", addToCart);
