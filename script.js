const api_url = 'https://api.themoviedb.org/3'
const api_popularity = '/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='
const api_search = '/search/movie?&api_key=399af3fea42fd17a119ef910e475a6c5&query=';
const api_vote = '/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page='

const imgPath = 'https://image.tmdb.org/t/p/w1280';
let pagination = 1
let categorySelected = api_popularity
const main = document.getElementById('main');
const form = document.getElementById('form');
const popularity = document.getElementById('popularity');
const vote = document.getElementById('vote');

const search = document.getElementById('search');
const loading = document.querySelector('.loading');

// initially get fav movies
getMovies(api_url + categorySelected + pagination)
addPagination()

function addPagination() {
    pagination += pagination
}


async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData.results)
}


function showMovies(movies) {
    //clear main
    // main.innerHTML = "";
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
            // loading.classList.remove('show');
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
    pagination = 1;
    e.preventDefault();
    const searchTerm = search.value;
    categorySelected = null
    if (searchTerm) {
        main.innerHTML = "";
        getMovies( api_url + api_search + searchTerm)
        search.value = '';
    }
});

popularity.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_popularity;
    getMovies(api_url + categorySelected + pagination);
    addPagination();
})
;

vote.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_vote
    getMovies(api_url + categorySelected + pagination)
    addPagination()
})
;

// infinite scrolling
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    // console.log({scrollTop, scrollHeight, clientHeight});

    if (clientHeight + scrollTop >= scrollHeight - 5) {
        // show the loading animation
        showLoading();
    }
});

function showLoading() {

    // loading.classList.add('show');

    // load more data
    setTimeout(getMovies(api_url + categorySelected + pagination), 1000)
    addPagination()
}


