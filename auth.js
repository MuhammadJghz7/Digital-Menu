// auth.js

// لیست کاربران مجاز (در نسخه واقعی، این‌ها در دیتابیس خواهند بود)
const users = [
  { username: "admin", password: "1234" },
  { username: "waiter", password: "5678" }
];

// ذخیره در localStorage فقط بار اول
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const allUsers = JSON.parse(localStorage.getItem("users"));

  const matched = allUsers.find(user => user.username === u && user.password === p);

  if (matched) {
    localStorage.setItem("currentUser", u);
    // پس از ورود موفق، هدایت به صفحه سفارشات
    window.location.href = "orders.html";
  } else {
    document.getElementById("error").innerText = "نام کاربری یا رمز اشتباه است.";
  }
}

// بررسی ورود در صفحات محافظت‌شده
function checkAuth() {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    alert("لطفاً ابتدا وارد شوید.");
    window.location.href = "login.html";
  }
}

// تابع خروج از حساب
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
