const header = document.querySelector("header");

window. addEventListener("scroll", function() {
    header.classList.toggle("sticky", window.scrollY > 60)
});

let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})

// initialize swiper js

const swiper = new Swiper('.swiper', {
    loop: true,

     // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },


})

document.querySelectorAll(".custom-social-link").forEach((link) => {
    link.addEventListener("click", () => {
      console.log(`Navigating to: ${link.href}`);
    });
  });

  const apiKey = "AIzaSyCPfyrTS4_uemvSljLsyXv7S90xUumhm4M";
const calendarId = "raydenreganta1804@gmail.com";

async function loadCalendarEvents() {
  try {
    // Endpoint Google Calendar API
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}`;

    // Fetch data dari Google Calendar API
    const response = await fetch(url);
    const data = await response.json();

    // Elemen untuk menampilkan acara
    const eventsContainer = document.getElementById("events");
    eventsContainer.innerHTML = "";

    if (data.items && data.items.length > 0) {
      data.items.forEach(event => {
        const eventElement = document.createElement("div");
        eventElement.className = "event";

        const eventTitle = event.summary || "Tanpa Judul";
        const eventStart = event.start?.dateTime || event.start?.date || "Tidak diketahui";

        eventElement.innerHTML = `
          <h3>${eventTitle}</h3>
          <p>Tanggal: ${new Date(eventStart).toLocaleString("id-ID", {
            dateStyle: "long",
            timeStyle: "short",
          })}</p>
        `;

        eventsContainer.appendChild(eventElement);
      });
    } else {
      eventsContainer.innerHTML = "<p>Tidak ada acara yang ditemukan.</p>";
    }
  } catch (error) {
    console.error("Gagal memuat acara:", error);
    document.getElementById("events").innerHTML = "<p>Gagal memuat acara.</p>";
  }
}

// Memuat acara saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", loadCalendarEvents);

  

