// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

// Create variables for selected DOM elements
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API using fetch APIs
async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data.Search);
    if (data.Response == "True") displayMovieList(data.Search);
}
// function excuted when user type into search bar 
function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    //use to disply the search list whne the return value is not empty
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        // emilinate the input value which are less than 3 characters
        if (searchTerm.length < 3) {
            return;
        } else {
            loadMovies(searchTerm);
        }
    } else {
        searchList.classList.add('hide-search-list');
    }
}
// display search movies list
function displayMovieList(movies) {
    searchList.innerHTML = "";
    movies.forEach((singlemovie) => {

        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = singlemovie.imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if (singlemovie.Poster != "N/A")
            moviePoster = singlemovie.Poster;
        else
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${singlemovie.Title}</h3>
            <p>${singlemovie.Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);


    });

    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movieItem => {
        movieItem.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movieItem.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.imdbRating}</li>
            <li class = "released">Released: ${details.Released}</li>
            <li class = "released" style="margin-left: 5px;">Runtime: ${details.Runtime}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "writer"><b>Director:</b> ${details.Director}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add('hide-search-list');
    }
});