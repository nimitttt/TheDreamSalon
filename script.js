
// Nav gradient

window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");

  if (window.scrollY <= 5) {
    nav.classList.remove("scrolled");
  } else {
    nav.classList.add("scrolled");
  }
});

// booking form script

// Toggle services dropdown (first form only)

function toggleServices() {

const list = document.getElementById("servicesList");

if(list.style.display === "block"){

list.style.display = "none";

}else{

list.style.display = "block";

}

}


// Send booking details to WhatsApp

function sendBooking1(){

let name = document.getElementById("name").value;

let email = document.getElementById("email").value;

let phone = document.getElementById("phone").value;

let locality = document.getElementById("locality").value;

let gender = document.getElementById("gender").value;

let date = document.getElementById("date").value;

let time = document.getElementById("time").value;


// collect selected services

let services = [];

document.querySelectorAll('input[name="service1"]:checked')
.forEach(service => {

services.push(service.value);

});


// validation safety check

if(name === "" || phone === "" || date === "" || time === ""){

alert("Please fill all required fields");

return;

}


// format WhatsApp message

let message =

"*New Salon Appointment Request*%0A%0A" +

"Name: " + name + "%0A" +

"Phone: " + phone + "%0A" +

"Email: " + email + "%0A" +

"Locality: " + locality + "%0A" +

"Gender: " + gender + "%0A" +

"Services: " + services.join(", ") + "%0A" +

"Date: " + date + "%0A" +

"Time: " + time;


// replace with your WhatsApp number

let whatsappURL =

"https://wa.me/919977114049?text=" + message;


// open WhatsApp chat

window.location.href = whatsappURL;

}

// hamburger menu Animation

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

if (menuBtn) {
  menuBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    menuBtn.classList.toggle("is-active");

    menu.classList.toggle("hidden");

    menu.classList.toggle("show");
  });
}

if (menu) {
  menu.addEventListener("click", function (event) {
    event.stopPropagation();
  });
}

document.addEventListener("click", function () {
  if (menu) {
    menu.classList.remove("show");

    menu.classList.add("hidden");
  }

  if (menuBtn) {
    menuBtn.classList.remove("is-active");
  }
});

const options = document.querySelectorAll(".menu-option");

options.forEach((option) => {
  option.addEventListener("click", function () {
    menu.classList.add("hidden");

    menu.classList.remove("show");

    menuBtn.classList.remove("is-active");
  });
});
