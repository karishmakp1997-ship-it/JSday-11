let products = [
    { name: "Laptop", price: 1200 },
    { name: "Smartphone", price: 800 },
    { name: "Tablet", price: 500 },
    { name: "Headphones", price: 150 },
    { name: "Smartwatch", price: 250 },
    { name: "Camera", price: 600 },
    { name: "Keyboard", price: 100 },
    { name: "Mouse", price: 50 }
];
function displayProducts() {
    let productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach(product => {
        let li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button
onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>`;
        productList.appendChild(li);
    });
}
function filterProducts() {
    let query = document.getElementById("search").value.toLowerCase();
    let filtered = products.filter(product =>
        product.name.toLowerCase().includes(query));
    let productList = document.getElementById("productList");
    productList.innerHTML = "";
    filtered.forEach(product => {
        let li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button
onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>`;
        productList.appendChild(li);
    });
}
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cartList");
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - $${item.price} <button
onclick="removeFromCart(${index})">❌</button>`;
        cartList.appendChild(li);
    });
    document.getElementById("cartTotal").innerText = total.toFixed(2);
}
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}
displayProducts();
loadCart();
