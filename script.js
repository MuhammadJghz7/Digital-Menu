// دریافت داده‌ها از localStorage
let foods = JSON.parse(localStorage.getItem("foods")) || [];

let cart = {};

function renderMenu(filter = "همه") {
  const container = document.getElementById("food-list");
  container.innerHTML = "";
  const hour = new Date().getHours();

  if (foods.length === 0) {
    container.innerHTML = "<p>هیچ غذایی ثبت نشده است.</p>";
    return;
  }

  foods
    .filter(f =>
      (filter === "همه" || f.category === filter) &&
      (f.time === "all" || Number(f.time) <= hour)
    )
    .forEach(food => {
      const finalPrice = food.price * (1 - food.discount);
      const div = document.createElement("div");
      div.className = "food-item" + (food.available ? "" : " unavailable");

      div.innerHTML = `
        <img src="${food.image}" alt="${food.name}">
        <div class="food-info">
          <h3>${food.name}</h3>
          <p>${food.ingredients.join("، ")}</p>
          <p>قیمت: 
            ${food.discount > 0 
              ? `<del>${food.price.toLocaleString()}</del> → <strong>${finalPrice.toLocaleString()}</strong> تومان`
              : `<strong>${food.price.toLocaleString()}</strong> تومان`}
          </p>
        </div>
        ${food.available ? `
          <button class="add-btn" onclick="addToCart('${food.name}')">+</button>
          <button class="remove-btn" onclick="removeFromCart('${food.name}')">−</button>
        ` : `<p>ناموجود</p>`}
      `;
      container.appendChild(div);
    });
}

function addToCart(name) {
  if (!cart[name]) cart[name] = 0;
  cart[name]++;
  updateCart();
}

function removeFromCart(name) {
  if (cart[name]) {
    cart[name]--;
    if (cart[name] === 0) delete cart[name];
    updateCart();
  }
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  cartList.innerHTML = "";
  let total = 0;

  for (let name in cart) {
    const item = foods.find(f => f.name === name);
    if (!item) continue; // اگر غذا حذف شده
    const price = item.price * (1 - item.discount);
    const quantity = cart[name];
    const li = document.createElement("li");
    li.textContent = `${item.name} × ${quantity} = ${(price * quantity).toLocaleString()} تومان`;
    cartList.appendChild(li);
    total += price * quantity;
  }

  totalPrice.textContent = total.toLocaleString();
}

function checkout() {
  if (Object.keys(cart).length === 0) {
    alert("🛒 سبد خرید شما خالی است.");
    return;
  }
  alert("✅ سفارش شما ثبت شد. با تشکر!");
  cart = {};
  updateCart();
}

function callWaiter() {
  alert("📣 گارسون در راه است!");
}

function sendMessageToWaiter() {
  const msg = prompt("پیام خود را وارد کنید:");
  if (msg) alert(`📨 پیام ارسال شد: ${msg}`);
}

function filterCategory(cat) {
  renderMenu(cat);
}

renderMenu();
