const foods = [
  { name: "کباب کوبیده", category: "غذای اصلی", image: "https://via.placeholder.com/90", price: 180000, available: true },
  { name: "سوپ جو", category: "پیش‌غذا", image: "https://via.placeholder.com/90", price: 60000, available: true },
  { name: "آب پرتقال", category: "نوشیدنی", image: "https://via.placeholder.com/90", price: 30000, available: false }
];

let cart = [];

function renderMenu(filter = "همه") {
  const container = document.getElementById("food-list");
  container.innerHTML = "";

  foods
    .filter(food => filter === "همه" || food.category === filter)
    .forEach(food => {
      const item = document.createElement("div");
      item.className = "food-item" + (food.available ? "" : " unavailable");
      item.innerHTML = `
        <img src="${food.image}" alt="${food.name}">
        <div class="food-info">
          <h3>${food.name}</h3>
          <p>${food.category}</p>
          <p><strong>${food.price.toLocaleString()} تومان</strong></p>
        </div>
        ${food.available ? `<button class="add-btn" onclick="addToCart('${food.name}')">افزودن</button>` : "<p>ناموجود</p>"}
      `;
      container.appendChild(item);
    });
}

function addToCart(name) {
  const food = foods.find(f => f.name === name);
  cart.push(food);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name + " - " + item.price.toLocaleString() + " تومان";
    cartList.appendChild(li);
    total += item.price;
  });

  totalPrice.textContent = total.toLocaleString();
}

function checkout() {
  alert("پرداخت انجام شد. سفارش ثبت گردید.");
  cart = [];
  updateCart();
}

function callWaiter() {
  alert("گارسون فراخوانی شد.");
}

function filterCategory(cat) {
  renderMenu(cat);
}

renderMenu();
