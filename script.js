window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");

  if (window.scrollY <= 5) {
    nav.classList.remove("scrolled");
  } else {
    nav.classList.add("scrolled");
  }
});

const button = document.getElementById("openMenu");
const menu = document.getElementById("menu");

button.addEventListener("click", function (event) {
  event.stopPropagation();
  menu.classList.toggle("hidden");
  menu.classList.toggle("show");
});

menu.addEventListener("click", function (event) {
  event.stopPropagation();
});

document.addEventListener("click", function () {
  menu.classList.remove("show");
  menu.classList.add("hidden");
});

const options = document.querySelectorAll(".menu-option");

options.forEach((option) => {
  option.addEventListener("click", function () {
    menu.classList.add("hidden");
  });
});

function toggleServices() {
  const list = document.getElementById("servicesList");

  if (list.style.display === "block") {
    list.style.display = "none";
  } else {
    list.style.display = "block";
  }
}
