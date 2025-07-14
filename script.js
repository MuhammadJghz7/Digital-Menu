const foods = [
  {
    name: "پیش‌فاب گوشت",
    image: "https://via.placeholder.com/80",
    price: 260000,
    desc: "گوشت گریل شده با سیب زمینی",
    available: true
  },
  {
    name: "مرغ سوخاری",
    image: "https://via.placeholder.com/80",
    price: 150000,
    desc: "مرغ سوخاری با ادویه مخصوص",
    available: true
  },
  {
    name: "ماهی سالمون",
    image: "https://via.placeholder.com/80",
    price: 320000,
    desc: "فیله سالمون با لیمو",
    available: false
  }
];

function renderMenu() {
  const container = document.getElementById("food-list");
  container.innerHTML = "";

  foods.forEach(food => {
    const div = document.createElement("div");
    div.className = "food-item" + (food.available ? "" : " unavailable");

    div.innerHTML = `
      <img src="${food.image}" alt="${food.name}">
      <div class="food-info">
        <h3>${food.name}</h3>
        <p>${food.desc}</p>
        <p><strong>${food.price.toLocaleString()} تومان</strong></p>
      </div>
      ${food.available ? `<button class="add-btn">افزودن</button>` : `<p>ناموجود</p>`}
    `;
    container.appendChild(div);
  });
}

function callWaiter() {
  alert("گارسون فراخوانی شد!");
}

renderMenu();
