let pagination = 1
const french = 'fr'
const english = 'en-us'
let languageSelected = french

const api_url = 'https://api.themoviedb.org/3'
let api_popularity = '/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=popularity.desc&include_adult=false&include_video=false&page=';
let api_search = '/search/movie?&api_key=399af3fea42fd17a119ef910e475a6c5&query=';
let api_vote = '/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=vote_count.desc&include_adult=false&include_video=false&page='
let api_release = '/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=release_date.desc&include_adult=false&include_video=false&page='
let api_revenue = '/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=revenue.desc&include_adult=false&include_video=false&page='
let api_note = '/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page='


const imgPath = 'https://image.tmdb.org/t/p/w1280';
let categorySelected = api_popularity
let index = 0

const main = document.getElementById('main');
const form = document.getElementById('form');

const popularity = document.getElementById('popularity');
const vote = document.getElementById('vote');
const release = document.getElementById('release');
const revenue = document.getElementById('revenue');
const note = document.getElementById('note');
const fr = document.getElementById('fr');
const eng = document.getElementById('eng');


const search = document.getElementById('search');
const loading = document.querySelector('.loading');


function testOpenModal() {
    console.log("test");
    $('#main').on('click', 'div.overview' & 'img', function (e) {
        console.log(e.target.parentElement.id);
    });

}

// initially get fav movies
openModal()
getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected)
addPagination()

// openModal()


function openModal() {
    // Get the modal
    let modal = document.getElementById("myModal");

    // Get the button that opens the modal

    let btn = document.getElementById("main");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

}

function movieId(movies) {
    let {poster_path, title, vote_average, overview, backdrop_path,original_language,release_date,genre_ids} = movies;

    $('#main').on('click', 'div.overview' & 'img', function (e) {
        const movieEl = document.getElementById(e.target.parentElement.id);
        let modal = document.getElementById('myModal');

        modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
         <p>${movies[e.target.parentElement.id].title}</p>
         <p>Résumé: ${movies[e.target.parentElement.id].overview}</p>
         <p>Langue de sortie: ${movies[e.target.parentElement.id].original_language}</p>
         <p>Note: ${movies[e.target.parentElement.id].vote_average}</p>
         <p>Date de sortie: ${movies[e.target.parentElement.id].release_date}</p>
         <p>Nombre de votes: ${movies[e.target.parentElement.id].vote_count}</p>
         <p>Genre: ${movies[e.target.parentElement.id].genre_ids}</p>
        <img src="${imgPath + movies[e.target.parentElement.id].backdrop_path}" alt="${title}">
    </div>
        `;
        main.appendChild(modal)
    });
}


function addPagination() {
    pagination += 1
}


async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData.results)
    movieId(respData.results)
}


function showMovies(movies) {
    //clear main
    // main.innerHTML = "";

    movies.forEach(movie => {

        const {poster_path, title, vote_average, overview, backdrop_path} = movie;
        const movieEl = document.createElement('div');
        if (poster_path == null) {
        } else {
            movieEl.classList.add('movie');
            movieEl.setAttribute('id', index)
            let getTargetId = document.getElementById(index)
            // movieEl.classList.add('portfolio-item');
            // movieEl.setAttribute('data-toggle','modal')
            // movieEl.setAttribute('data-target',"#preview")
            movieEl.innerHTML = `
        <img src="${imgPath + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Résumé</h3>
        ${overview}
        </div>
        `;
            main.appendChild(movieEl)
            // loading.classList.remove('show');
        }
        index += 1
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
        getMovies(api_url + api_search + searchTerm)
        search.value = '';
    }
});

popularity.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_popularity;
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected);
    addPagination();
});


vote.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_vote;
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected);
    addPagination();
});

release.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_release;
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected);
    addPagination();
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected);
    addPagination();
});

revenue.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_revenue;
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected);
    addPagination();

});

fr.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    languageSelected = french;
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected);

});

eng.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    languageSelected = english;
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected);

});


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
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected)
    addPagination()
}




