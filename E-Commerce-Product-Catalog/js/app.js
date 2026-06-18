let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();

async function loadProducts() {
    try {
        const response = await fetch("data/products.json");

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        products = await response.json();

        displayProducts(products);

    } catch (error) {
        document.getElementById("products").innerHTML =
            `<h2>${error.message}</h2>`;
    }
}

function displayProducts(items) {

    const container = document.getElementById("products");

    container.innerHTML = "";

    items.forEach(product => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        container.appendChild(card);
    });
}

function addToCart(id) {

    const product = products.find(item => item.id === id);

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart");
}

function updateCartCount() {

    document.getElementById("cart-count").textContent = cart.length;
}

document.getElementById("search").addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(keyword)
    );

    displayProducts(filteredProducts);
});

loadProducts();