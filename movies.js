let pagination = 1;
const french = 'fr';
const english = 'en-us';
let languageSelected = french;

const api_url = 'https://api.themoviedb.org/3';
let api_popularity = '/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=popularity.desc&include_adult=false&include_video=false&page=';
let api_search = '/search/movie?&api_key=399af3fea42fd17a119ef910e475a6c5&query=';
let api_vote = '/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=vote_count.desc&include_adult=false&include_video=false&page=';
let api_release = '/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=release_date.desc&include_adult=false&include_video=false&page=';
let api_revenue = '/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=revenue.desc&include_adult=false&include_video=false&page=';
// let api_note = '/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=';
let api_genre_fr = '/genre/movie/list?api_key=399af3fea42fd17a119ef910e475a6c5&language=fr';
// let api_cast_fr = '';
let video_key = '';


const imgPath = 'https://image.tmdb.org/t/p/w1280';
let categorySelected = api_popularity;
let index = 0;
let listMovies = [];
let genresResp = [];
let genres = [];


const main = document.getElementById('main');
const form = document.getElementById('form');

const popularity = document.getElementById('popularity');
const vote = document.getElementById('vote');
const release = document.getElementById('release');
const revenue = document.getElementById('revenue');
// const note = document.getElementById('note');
const fr = document.getElementById('fr');
const eng = document.getElementById('eng');
const search = document.getElementById('search');
// const loading = document.querySelector('.loading');


openModal();
getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));
addPagination();
getMoviesGenre(api_url + api_genre_fr).then(r => console.log(r));
printCast()

function openModal() {
    let btn = document.getElementById("main");
    let span = document.getElementsByClassName("close")[0];
    let modal = document.getElementById("myModal");

    btn.onclick = function () {
        modal.style.display = "block";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function movieId(movies) {
    movies.forEach(movie => {
        listMovies.push(movie);
    });


    $('#main').on('click', 'img', function (e) {
        let modal = document.getElementById('myModal');
        let movie = listMovies[e.target.parentElement.id];
        let {id, title, vote_average, overview, backdrop_path, release_date, genre_ids, vote_count} = movie;
        // getMoviesCast(api_url + '/movie/' + movie.id + '/credits?api_key=399af3fea42fd17a119ef910e475a6c5').then(r => console.log(r))

        // getMoviesVideo(api_url + '/movie/' +  movie.id + '/videos?api_key=399af3fea42fd17a119ef910e475a6c5');


        console.log(movie);
        modal.innerHTML = `
    <div class="modal-content">
        
        <img src="${imgPath + backdrop_path}" alt="${title}">
        
        <div class="movie-modal">
             <div class="movie-modal-note">${vote_average}</div>
             <div class="movie-modal-title">${title}</div>
              <div class = movie-modal-release-date>Date de sortie: ${release_date}</div>
             <div class="movie-modal-overview">${overview}</div>
<!--             <div class="movie-modal-votes">${vote_count}</div>-->
             <p>${showMoviesGenre(genre_ids)}</p>
             <div>${id}</div>
<!--             <iframe  src="https://www.youtube.com/embed/${video_key}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>         -->

         </div>
    </div>
        `;
        main.appendChild(modal);
    });
}



function addPagination() {
    pagination += 1;
}


async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData.results);
     movieId(respData.results);
}

async function getMoviesGenre(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    let keys = Object.keys(respData);
    keys.forEach(function (key) {
        genresResp.push(respData[key]);
    })
    let genresTrue = genresResp[0];
    genresTrue.forEach(genre => {
        genres.push({key: genre.id, value: genre.name});
    })
}

async function getMoviesVideo(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMoviesVideo(respData.results);
}


async function getMoviesCast(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovieCast(respData.cast);
}

function showMovieCast(caster) {
    let casting = [];
    caster.forEach(cast => {
        casting.push(" " + cast.name);
    });
    let casting_String = ''
    casting.forEach(cast => {
        casting_String.concat()
    })
    return (casting_String)
}

function showMoviesVideo(videos) {
    video_key = videos[0].key;
}

function showMoviesGenre(genreTargeted) {
    let listGenres = [];
    genres.forEach(genre => {
        genreTargeted.forEach(genreSelected => {
            if (genre.key === genreSelected) {
                listGenres.push(" " + genre.value);
            }
        })
    })
    return listGenres
}


function showMovies(movies) {
    movies.forEach(movie => {

        const {poster_path, title, vote_average, overview, backdrop_path} = movie;
        const movieEl = document.createElement('div');
        if (poster_path == null) {
        } else {
            movieEl.classList.add('movie');
            movieEl.setAttribute('id', index);
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
            main.appendChild(movieEl);
            // loading.classList.remove('show');
        }
        index += 1;
    });
    console.log(movies);
    console.log(typeof movies);
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
        getMovies(api_url + api_search + searchTerm).then(r => console.log(r))
        search.value = '';
    }
});

popularity.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_popularity;
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));
    addPagination();
});


vote.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_vote;
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));
    addPagination();
});

release.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_release;
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));
    addPagination();
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));
    addPagination();
});

revenue.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_revenue;
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));
    addPagination();

});

fr.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    languageSelected = french;
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));

});

eng.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    languageSelected = english;
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));

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
    getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r))
    addPagination()
}




