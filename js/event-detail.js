const EVENTS_URL = "data/events.json";

function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

async function loadEvent() {
    const id = getParam("id");
    const res = await fetch(EVENTS_URL);
    const events = await res.json();

    const index = events.findIndex(e => e.id == id);
    const event = events[index];

    if (!event) return;

    const date = new Date(event.date);

    document.getElementById("event-image").src = `img/events/${event.image}`;
    // document.getElementById("event-title").textContent = event.title;
    document.getElementById("event-footer-title").textContent = event.title;

    // document.getElementById("event-day").textContent =
    //     date.toLocaleDateString("en", { weekday: "long" }).toUpperCase();

    document.getElementById("event-description").innerHTML =
        `<p class="event-content-text">${event.description}</p>`;

    document.getElementById("event-date").textContent =
        date.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" });

    document.getElementById("event-time").textContent = event.time;
    document.getElementById("event-location").textContent = event.location;

    // Navigation
    if (events[index - 1])
        document.getElementById("prev-event").href = `event.html?id=${events[index - 1].id}`;

    if (events[index + 1])
        document.getElementById("next-event").href = `event.html?id=${events[index + 1].id}`;
}

document.addEventListener("DOMContentLoaded", loadEvent);