
// Nav gradient

window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");

  if (window.scrollY <= 5) {
    nav.classList.remove("scrolled");
  } else {
    nav.classList.add("scrolled");
  }
});

// menu open script

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

window.open(whatsappURL, "_blank");

}
