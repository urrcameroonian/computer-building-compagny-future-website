// scripts.js

document.getElementById('add-to-cart').addEventListener('click', function() {
    const cpu = document.getElementById('cpu-select').value;
    const gpu = document.getElementById('gpu-select').value;
    const ram = document.getElementById('ram-select').value;

    if (cpu && gpu && ram) {
        alert(`Added to cart:\nCPU: ${cpu}\nGPU: ${gpu}\nRAM: ${ram}`);
        // Here you can add functionality to actually add these to a cart
    } else {
        alert('Please select all parts before adding to cart.');
    }
});
