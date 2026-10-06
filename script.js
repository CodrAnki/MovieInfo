const API_KEY = "3730cc0";
const BASE_URL = "https://www.omdbapi.com/?apikey=" + API_KEY;

// Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const trendingContainer = document.querySelector(
  ".movies:nth-of-type(1) .movie-container",
);

const popularContainer = document.querySelector(
  ".movies:nth-of-type(2) .movie-container",
);

const details = document.querySelector(".details");

// Movies List
const trendingMovies = [
  "Avengers Endgame",
  "Spider-Man No Way Home",
  "John Wick",
  "Interstellar",
];

const popularMovies = [
  "Oppenheimer",
  "Avatar",
  "The Batman",
  "Joker",
  "The odyssey",
  "Alpha",
];

// Load Cards
async function loadMovies(list, container) {
  container.innerHTML = "";

  for (let movieName of list) {
    const res = await fetch(`${BASE_URL}&t=${encodeURIComponent(movieName)}`);
    const movie = await res.json();

    if (movie.Response === "True") {
      container.innerHTML += `
        <div class="card">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="info">
                <h3>${movie.Title}</h3>
                <p>⭐ ${movie.imdbRating} | ${movie.Year}</p>
                <button onclick="showDetails('${movie.imdbID}')">
                    View Details
                </button>
            </div>
        </div>
      `;
    }
  }
}

// Show Details
async function showDetails(id) {
  const res = await fetch(`${BASE_URL}&i=${id}`);
  const movie = await res.json();

  details.innerHTML = `
      <h2>Movie Details</h2>

      <img src="${movie.Poster}" alt="${movie.Title}">

      <h3>${movie.Title}</h3>

      <p><strong>Genre:</strong> ${movie.Genre}</p>

      <p><strong>Release:</strong> ${movie.Released}</p>

      <p><strong>IMDb Rating:</strong> ⭐ ${movie.imdbRating}</p>

      <p><strong>Runtime:</strong> ${movie.Runtime}</p>

      <p>${movie.Plot}</p>
  `;

  details.scrollIntoView({
    behavior: "smooth",
  });
}

// Search Movie
async function searchMovie() {
  const movieName = searchInput.value.trim();

  if (movieName === "") {
    alert("Please enter movie name");
    return;
  }

  const res = await fetch(`${BASE_URL}&t=${encodeURIComponent(movieName)}`);
  const movie = await res.json();

  if (movie.Response === "True") {
    details.innerHTML = `
      <h2>Movie Details</h2>

      <img src="${movie.Poster}" alt="${movie.Title}">

      <h3>${movie.Title}</h3>

      <p><strong>Genre:</strong> ${movie.Genre}</p>

      <p><strong>Release:</strong> ${movie.Released}</p>

      <p><strong>IMDb Rating:</strong> ⭐ ${movie.imdbRating}</p>

      <p><strong>Runtime:</strong> ${movie.Runtime}</p>

      <p>${movie.Plot}</p>
    `;

    details.scrollIntoView({
      behavior: "smooth",
    });
  } else {
    alert("Movie not found!");
  }

  searchInput.value = "";
}

// Events
searchBtn.addEventListener("click", searchMovie);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchMovie();
  }
});

// Initial Load
loadMovies(trendingMovies, trendingContainer);
loadMovies(popularMovies, popularContainer);
