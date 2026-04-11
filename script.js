// Nav gradient

window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");

  if (window.scrollY <= 5) {
    nav.classList.remove("scrolled");
  } else {
    nav.classList.add("scrolled");
  }
});

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

// booking form script

// bridal multiple date selection

function addDateField() {
  const container = document.getElementById("date-container");

  const newField = document.createElement("div");

  newField.classList.add("date-entry");

  newField.innerHTML = `

    <input type="date" class="bride-date" name="bridal_date[]" required>

    <input
      type="text"
      name="function_name[]"
      placeholder="Function name (optional)"
      class="fun-name"
    >

    <button type="button" class="remove" onclick="removeDateField(this)">
      Remove
    </button>

  `;

  container.appendChild(newField);
}

function removeDateField(button) {
  button.parentElement.remove();
}

// Male female diff services

const genderSelect = document.getElementById("gender");

const servicesContainer = document.getElementById("servicesContainer");

const services = {
  male: [
    "Haircut",
    "Beard Styling",
    "Face Cleanup",
    "Hair Coloring",
    "Head Massage",
  ],

  female: [
    "Hair Spa",
    "Facial",
    "Threading",
    "Waxing",
    "Hair Styling",
    "Makeup",
  ],
};

genderSelect.addEventListener("change", function () {
  const selectedGender = this.value;

  servicesContainer.innerHTML = "";

  if (!services[selectedGender]) return;

  services[selectedGender].forEach((service) => {
    const label = document.createElement("label");

    label.innerHTML = `<input type="checkbox" name="service1" value="${service}"> ${service}`;

    servicesContainer.appendChild(label);

    servicesContainer.appendChild(document.createElement("br"));
  });
});

// Toggle services dropdown (first form only)

function toggleServices() {
  const list = document.getElementById("servicesList");

  if (list.style.display === "block") {
    list.style.display = "none";
  } else {
    list.style.display = "block";
  }
}

// toggle service dropdown for bridal section

function toggleBridalServices() {
  const list = document.getElementById("servicesList2");

  if (list.style.display === "block") {
    list.style.display = "none";
  } else {
    list.style.display = "block";
  }
}

// Send booking details to WhatsApp

function add45Minutes(time) {
  let [h, m] = time.split(":");

  h = parseInt(h);
  m = parseInt(m) + 45;

  if (m >= 60) {
    m -= 60;
    h += 1;
  }

  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;

  return h + ":" + m;
}

let blockedSlotsCache = [];

async function sendBooking1() {
  let name = document.getElementById("name").value;

  let email = document.getElementById("email").value;

  let phone = document.getElementById("phone").value;

  let locality = document.getElementById("locality").value;

  let gender = document.getElementById("gender").value;

  let date = document.getElementById("dateInput").value;

  let time = document.getElementById("timeInput").value;

  // collect selected services

  let services = [];

  document
    .querySelectorAll('input[name="service1"]:checked')
    .forEach((service) => {
      services.push(service.value);
    });

  if (name === "" || phone === "" || date === "" || time === "") {
    alert("Please fill all required fields");

    return;
  }

  // CHECK BLOCKED SLOTS

  if (blockedSlotsCache.length === 0) {
    alert("Checking availability... please try again.");

    return;
  }

  let blocked = false;

  blockedSlotsCache.forEach((slot) => {
    const blockedDate = slot[0];

    const startTime = slot[1];

    const endTime = slot[2];

    if (date === blockedDate) {
      if (time >= startTime && time <= endTime) {
        blocked = true;
      }
    }
  });

  if (blocked) {
    alert(
      "This time slot is already booked or unavailable. Please select another time or contact the salon.",
    );

    return;
  }

  // SEND DATA TO GOOGLE SHEETS

  fetch(
    "https://script.google.com/macros/s/AKfycbytVeLlpRkyZha9rlFUJHn7XUQ7SnfuI2B0a8O_gxrQQZuvajArHbSxb1Qdw39RDNTw/exec",
    {
      method: "POST",
      mode:"no-cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        phone: phone,
        date: date,
      }),
    },
  );

  fetch(
    "https://script.google.com/macros/s/AKfycbwAVdC0FQm2Z20g3SfpEvlyR7jgJUv_LfzNkiCU7CxbQ_yDqQc6WvR5y6MPQzKbchxi/exec",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
        start: time,
        end: add45Minutes(time),
      }),
    },
  );

  // SEND WHATSAPP MESSAGE

  let message =
    "*New Salon Appointment Request*%0A%0A" +
    "Name: " +
    name +
    "%0A" +
    "Phone: " +
    phone +
    "%0A" +
    "Email: " +
    email +
    "%0A" +
    "Locality: " +
    locality +
    "%0A" +
    "Gender: " +
    gender +
    "%0A" +
    "Services: " +
    services.join(", ") +
    "%0A" +
    "Date: " +
    date +
    "%0A" +
    "Time: " +
    time;

  let whatsappURL = "https://wa.me/919977114049?text=" + message;

  window.open(whatsappURL, "_blank");
}

function sendBridalBooking() {
  let name = document.getElementById("bride-name").value;

  let email = document.getElementById("bride-email").value;

  let phone = document.getElementById("bride-phone").value;

  let locality = document.getElementById("bride-locality").value;

  // collect selected services

  let services = [];

  document
    .querySelectorAll('input[name="bridalService"]:checked')

    .forEach((service) => {
      services.push(service.value);
    });

  // collect multiple function dates

  let dateEntries = [];

  document.querySelectorAll(".date-entry").forEach((entry) => {
    let date = entry.querySelector(".bride-date").value;

    let functionName = entry.querySelector(".fun-name").value;

    dateEntries.push(date + " (" + functionName + ")");
  });

  if (name === "" || phone === "") {
    alert("Please fill all required fields");

    return;
  }

  // format message

  let message =
    "*New Bridal Booking Request*%0A%0A" +
    "Name: " +
    name +
    "%0A" +
    "Phone: " +
    phone +
    "%0A" +
    "Email: " +
    email +
    "%0A" +
    "Locality: " +
    locality +
    "%0A" +
    "Services: " +
    services.join(", ") +
    "%0A" +
    "Function Dates: " +
    dateEntries.join(", ");

  // google sheet bride

  fetch(
    "https://script.google.com/macros/s/AKfycbytVeLlpRkyZha9rlFUJHn7XUQ7SnfuI2B0a8O_gxrQQZuvajArHbSxb1Qdw39RDNTw/exec",
    {
      method: "POST",

      body: JSON.stringify({
        name: name,

        phone: phone,
      }),
    },
  );

  // open WhatsApp

  let whatsappURL = "https://wa.me/919977114049?text=" + message;

  window.open(whatsappURL, "_blank");
}

// previous dates not selectable

const today = new Date().toISOString().split("T")[0];
document.getElementById("dateInput").setAttribute("min", today);

// something related tto slot blovking

async function loadBlockedSlots() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwAVdC0FQm2Z20g3SfpEvlyR7jgJUv_LfzNkiCU7CxbQ_yDqQc6WvR5y6MPQzKbchxi/exec",
    );

    blockedSlotsCache = await response.json();
  } catch (error) {
    console.log("Blocked-slot fetch failed");
  }
}

loadBlockedSlots();
