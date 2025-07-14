const foods = [
  {
    name: "چلوکباب سلطانی",
    category: "غذای اصلی",
    ingredients: ["برنج ایرانی", "کباب کوبیده", "کباب برگ"],
    image: "https://via.placeholder.com/90",
    price: 250000,
    discount: 0.1,
    available: true,
    time: "all"
  },
  {
    name: "سوپ قارچ",
    category: "پیش‌غذا",
    ingredients: ["قارچ", "خامه", "شیر", "جو"],
    image: "https://via.placeholder.com/90",
    price: 60000,
    discount: 0,
    available: true,
    time: "18"
  },
  {
    name: "نوشابه قوطی",
    category: "نوشیدنی",
    ingredients: ["نوشابه گازدار", "قند"],
    image: "https://via.placeholder.com/90",
    price: 20000,
    discount: 0,
    available: false,
    time: "all"
  }
];

let cart = {};

function renderMenu(filter = "همه") {
  const container = document.getElementById("food-list");
  container.innerHTML = "";
  const hour = new Date().getHours();

  foods
    .filter(f => (filter === "همه" || f.category === filter) && 
                 (f.time === "all" || Number(f.time) <= hour))
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
  alert("✅ سفارش شما ثبت شد!");
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
