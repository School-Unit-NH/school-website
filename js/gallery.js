// 🔹 CONFIG
const imagesPerPage = 9;

// 🔹 SHUFFLE FUNCTION
function shuffleArray(array) {
    const arr = [...array]; // clone to avoid mutating original
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// 🔹 IMAGE SOURCE LIST
const galleryImages = shuffleArray([
    "1.jpeg", "2.webp", "3.jpeg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg",
    "classes-1.jpg", "classes-2.jpg", "classes-3.jpg", "classes-4.jpg", "classes-5.jpg"
]);

let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById("gallery-container");
    const paginationContainer = document.getElementById("gallery-pagination");
    const overlay = document.getElementById("image-overlay");
    const overlayImg = overlay.querySelector("img");

    if (!galleryContainer || !paginationContainer || !overlay) {
        console.warn("Gallery containers or overlay not found");
        return;
    }

    function renderGallery() {
        galleryContainer.innerHTML = "";

        const start = (currentPage - 1) * imagesPerPage;
        const end = start + imagesPerPage;
        const pageImages = galleryImages.slice(start, end);

        pageImages.forEach(src => {
            const col = document.createElement("div");
            col.className = "col-lg-4 col-md-6 wow zoomIn";

            col.innerHTML = `
                <div class="gallery-item position-relative overflow-hidden rounded">
                    <img src="img/gallery/${src}" class="gallery-img" alt="Gallery Image">
                </div>
            `;

            // 🔹 CLICK TO OPEN FULL IMAGE
            const img = col.querySelector("img");
            img.style.cursor = "pointer";
            img.addEventListener("click", () => {
                overlayImg.src = img.src;
                overlay.style.display = "flex";
            });

            galleryContainer.appendChild(col);
        });

        renderPagination();
    }

    function renderPagination() {
        paginationContainer.innerHTML = "";
        const totalPages = Math.ceil(galleryImages.length / imagesPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.className = `page-item ${i === currentPage ? "active" : ""}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;

            li.addEventListener("click", e => {
                e.preventDefault();
                currentPage = i;
                renderGallery();
                document.getElementById("gallery-section")
                    .scrollIntoView({ behavior: "smooth", block: "start" });
            });

            paginationContainer.appendChild(li);
        }
    }

    // 🔹 CLOSE OVERLAY
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.style.display = "none";
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") overlay.style.display = "none";
    });

    // 🔹 INIT
    renderGallery();
});