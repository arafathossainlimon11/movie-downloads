// Default sample movie corrected (লোগো কার্ড রিমুভ করা হয়েছে)
if (!localStorage.getItem('movies')) {
    const defaultMovies = [
        {
            id: 1,
            name: "The Paradise (2026)",
            image: "https://i.ibb.co.com/4g3Z8v9/paradise.jpg", // সঠিক মুভি পোস্টার লিংক
            category: "Hindi",
            year: "2026-09-25",
            desc: "Firoz has one dream: become a Pan-Indian superstar, but everyone around him has other plans.",
            size: "700 MB",
            link: "https://www.profitableratecpmnetwork.com/s5fy4gh55?key=9fc00dcdecd75479e9d7d55362b41afa"
        }
    ];
    localStorage.setItem('movies', JSON.stringify(defaultMovies));
}

// Load movies on Home Page
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("movieGrid")) {
        displayMovies(JSON.parse(localStorage.getItem('movies')));
    }
});

function displayMovies(movies) {
    const grid = document.getElementById("movieGrid");
    grid.innerHTML = "";
    if(movies.length === 0) {
        grid.innerHTML = "<p style='grid-column: span 2; text-align: center; color: #888;'>No movies found!</p>";
        return;
    }
    movies.forEach(movie => {
        grid.innerHTML += `
            <div class="movie-card" onclick="openMovie(${movie.id})">
                <img src="${movie.image}" alt="${movie.name}">
                <div class="movie-info">
                    <h3>${movie.name}</h3>
                    <p>${movie.category} • ${movie.year}</p>
                </div>
            </div>
        `;
    });
}

function openMovie(id) {
    localStorage.setItem('selectedMovieId', id);
    window.location.href = "movie.html";
}

// Load Movie Details Page
function loadMovieDetails() {
    const id = localStorage.getItem('selectedMovieId');
    const movies = JSON.parse(localStorage.getItem('movies'));
    const movie = movies.find(m => m.id == id);

    const container = document.getElementById("movieDetails");
    if (movie) {
        container.innerHTML = `
            <img src="${movie.image}" class="details-poster" alt="${movie.name}">
            <h2>${movie.name}</h2>
            <p style="margin: 8px 0; color: #00bcd4; font-size: 13px;">Category: ${movie.category}</p>
            <p style="margin: 8px 0; color: #aaa; font-size: 12px;">Released: ${movie.year}</p>
            <hr style="border: 0.5px solid #444; margin: 12px 0;">
            <h3 style="font-size: 15px; margin-bottom: 5px;">Storyline</h3>
            <p style="margin: 8px 0; line-height: 1.4; font-size: 13px; color: #ddd;">${movie.desc}</p>
            <hr style="border: 0.5px solid #444; margin: 12px 0;">
            <h3 style="font-size: 15px; margin-bottom: 5px;">Download Links</h3>
            <a href="download.html?id=${movie.id}" class="download-btn-link">📥 Download [${movie.size}]</a>
        `;
    } else {
        container.innerHTML = "<p>Movie not found!</p>";
    }
}

// Load Download Redirect Page
function loadDownloadPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const movies = JSON.parse(localStorage.getItem('movies'));
    const movie = movies.find(m => m.id == id);

    const box = document.getElementById("downloadBoxInfo");
    if (movie) {
        box.innerHTML = `
            <h2 style="font-size: 15px; margin-bottom: 12px; color: #00bcd4;">${movie.name}</h2>
            <p style="font-size: 13px; margin: 5px 0;"><b>File Size:</b> ${movie.size}</p>
            <p style="font-size: 13px; margin: 5px 0;"><b>Upload Date:</b> ${movie.year}</p>
            <hr style="border: 0.5px solid #444; margin: 12px 0;">
            <p style="margin-bottom: 12px; font-size: 12px; color: #ff9800;">⚡ Download Link Generated Successfully!</p>
            <a href="${movie.link}" class="download-btn-link" target="_blank">🚀 Direct Fast Download</a>
        `;
    } else {
        box.innerHTML = "<p>Invalid download link!</p>";
    }
}

// Filter Category
function filterCategory(cat) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const movies = JSON.parse(localStorage.getItem('movies'));
    if (cat === 'All') {
        displayMovies(movies);
    } else {
        const filtered = movies.filter(m => m.category === cat);
        displayMovies(filtered);
    }
}

// Search Movies
function searchMovies() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    const movies = JSON.parse(localStorage.getItem('movies'));
    const filtered = movies.filter(m => m.name.toLowerCase().includes(query));
    displayMovies(filtered);
}

// Admin Login Check
function checkLogin() {
    let pass = document.getElementById("adminPass").value;
    if (pass === "arafat45456") {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("dashboardBox").style.display = "block";
    } else {
        document.getElementById("errorMsg").innerText = "Wrong Password! Try again.";
    }
}

function logoutAdmin() {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("dashboardBox").style.display = "none";
    document.getElementById("adminPass").value = "";
}

// Add Movie from Admin
function addMovie(e) {
    e.preventDefault();
    const name = document.getElementById("mName").value;
    const image = document.getElementById("mImage").value;
    const category = document.getElementById("mCategory").value;
    const year = document.getElementById("mYear").value;
    const desc = document.getElementById("mDesc").value;
    const size = document.getElementById("mSize").value;
    const link = document.getElementById("mLink").value;

    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const newMovie = {
        id: Date.now(),
        name,
        image,
        category,
        year,
        desc,
        size,
        link
    };

    movies.unshift(newMovie);
    localStorage.setItem('movies', JSON.stringify(movies));
    alert("Movie Added Successfully!");
    document.getElementById("movieForm").reset();
        }
