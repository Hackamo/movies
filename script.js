const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=399af3fea42fd17a119ef910e475a6c5&page=1';
const api_search = 'https://api.themoviedb.org/3/search/movie?&api_key=399af3fea42fd17a119ef910e475a6c5&query=';
const imgPath = 'https://image.tmdb.org/t/p/w1280';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// initially get fav movies
getMovies(api_url)


async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results)
}


function showMovies(movies) {
    //clear main
    main.innerHTML = ''
    movies.forEach(movie => {
        const {poster_path, title, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        if (poster_path == null) {
        } else {


            movieEl.classList.add('movie');

            movieEl.innerHTML = `
        <img src="${imgPath + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview:</h3>
        ${overview}
        </div>
        `;
            main.appendChild(movieEl)
        }
    });
    console.log(movies)

}

function getClassByRate(vote) {
    if (vote >= 7) {
        return 'green'
    } else if (vote >= 6) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(api_search + searchTerm)
        search.value = '';
    }
});

