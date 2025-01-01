const apiKey = "AIzaSyCPfyrTS4_uemvSljLsyXv7S90xUumhm4M";
const calendarId = "raydenreganta1804@gmail.com";

async function loadCalendarEvents() {
  try {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}`;

    console.log("Fetching data from URL:", url); // Debugging

    const response = await fetch(url);
    const data = await response.json();

    console.log("API Response:", data); // Debugging

    const eventsContainer = document.getElementById("calendar-events");
    eventsContainer.innerHTML = "";

    if (data.items && data.items.length > 0) {
      data.items.forEach(event => {
        const eventElement = document.createElement("div");
        eventElement.className = "calendar-event";

        const eventTitle = event.summary || "Tanpa Judul";
        const eventStart = event.start?.dateTime || event.start?.date || "Tidak diketahui";

        eventElement.innerHTML = `
          <h3 class="calendar-event-title">${eventTitle}</h3>
          <p class="calendar-event-details">Tanggal: ${new Date(eventStart).toLocaleString("id-ID", {
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
    document.getElementById("calendar-events").innerHTML = "<p>Gagal memuat acara.</p>";
  }
}

// Memuat acara saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", loadCalendarEvents);
