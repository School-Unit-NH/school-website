// ===============================
// Events Configuration
// ===============================
const EVENTS_PER_PAGE = 3;
const EVENTS_URL = "data/events.json";

let events = [];
let currentPage = 1;

// ===============================
// Load Events from JSON
// ===============================
async function loadEvents() {
    try {
        const response = await fetch(EVENTS_URL);
        events = await response.json();

        document.getElementById("events-loading").classList.add("d-none");
        document.getElementById("events-container").classList.remove("d-none");

        renderEvents();
        renderPagination();
    } catch (error) {
        document.getElementById("events-loading").innerHTML =
            "<p class='text-danger'>Failed to load events.</p>";
        console.error("Error loading events:", error);
    }
}

// ===============================
// Render Events
// ===============================
function renderEvents() {
    const container = document.getElementById("events-container");
    container.innerHTML = "";

    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    const pageEvents = events.slice(start, start + EVENTS_PER_PAGE);

    pageEvents.forEach(event => {
        const date = new Date(event.date);
        const month = date.toLocaleString("en", { month: "short" }).toUpperCase();
        const day = date.getDate();

        const eventHTML = `
        <div class="event-row">
            <div class="event-date">
                <span class="event-month">${month}</span>
                <span class="event-day">${day}</span>
            </div>

            <div class="event-media">
                <img src="img/events/${event.image}" alt="${event.title}">
            </div>

            <div class="event-details">
                <h3 class="event-title">${event.title}</h3>

                <div class="event-meta">
                    <span>${event.location}</span><br>
                    <span>${event.time}</span>
                </div>

                <p class="event-description">${event.description}</p>

                <a href="event.html?id=${event.id}" class="event-link">
                    View Event Details <span>→</span>
                </a>
            </div>
        </div>
        `;


        container.insertAdjacentHTML("beforeend", eventHTML);
    });
}

// ===============================
// Pagination
// ===============================
function renderPagination() {
    const pagination = document.getElementById("events-pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === currentPage ? "active" : ""}`;

        li.innerHTML = `
            <a class="page-link" href="#">${i}</a>
        `;

        li.addEventListener("click", e => {
            e.preventDefault();
            currentPage = i;
            renderEvents();
            renderPagination();
        });

        pagination.appendChild(li);
    }
}

// ===============================
// Init
// ===============================
document.addEventListener("DOMContentLoaded", loadEvents);