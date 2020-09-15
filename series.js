let pagination = 1;
const french = 'fr';
const english = 'en-us';
let languageSelected = french;

const api_url = 'https://api.themoviedb.org/3';
let api_popularity = '/discover/tv?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=popularity.desc&include_adult=false&include_video=false&page=';
let api_search = '/search/tv?&api_key=399af3fea42fd17a119ef910e475a6c5&query=';
let api_vote = '/discover/tv?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=vote_count.desc&include_adult=false&include_video=false&page=';
let api_release = '/discover/tv?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=release_date.desc&include_adult=false&include_video=false&page=';
let api_revenue = '/discover/tv?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=revenue.desc&include_adult=false&include_video=false&page=';
// let api_note = '/discover/tv?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=';
let api_genre_fr = '/genre/tv/list?api_key=399af3fea42fd17a119ef910e475a6c5';
// let api_cast_fr = '';
let video_key = '';


const imgPath = 'https://image.tmdb.org/t/p/w1280/';
let categorySelected = api_popularity;
let index = 0;
let listMovies = [];
let genresResp = [];
let genres = [];
let casting = [];
let crew = [];
let casting_photos = [];
let crew_photos = [];


const main = document.getElementById('main');
const form = document.getElementById('form');

const popularity = document.getElementById('popularity');
const vote = document.getElementById('vote');
const release = document.getElementById('release');
const revenue = document.getElementById('revenue');
// const note = document.getElementById('note');
// const fr = document.getElementById('fr');
// const eng = document.getElementById('eng');
const search = document.getElementById('search');
// const loading = document.querySelector('.loading');


openModal();
getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));
addPagination();
getMoviesGenre(api_url + api_genre_fr + '&language=' + languageSelected).then(r => console.log(r));

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function movieId(movies) {
    movies.forEach(movie => {
        listMovies.push(movie);
    });

    $('#main').on('click', 'div', async function (e) {
        let modal = document.getElementById('myModal');
        let movie = listMovies[e.target.parentElement.id];
        let {id, name, vote_average, overview, backdrop_path, first_air_date, genre_ids, vote_count} = movie;
        console.log(movies)

        getMoviesCast( api_url + '/tv/' + movie.id + '/credits?api_key=399af3fea42fd17a119ef910e475a6c5');
        getMoviesVideo(api_url + '/tv/' + movie.id + '/videos?api_key=399af3fea42fd17a119ef910e475a6c5');
        await sleep(100)

        modal.innerHTML = `
    <div class="modal-content">
        
        <img src="${imgPath + backdrop_path}" alt="${name}">
        
        <div id="movie-modal" class="movie-modal">
             <div class="movie-modal-note">${vote_average}</div>
             <div class="movie-modal-votes">${vote_count} votes</div>
             <div class="movie-modal-title">${name}</div>
             <div class = movie-modal-release-date>Date de sortie: ${first_air_date}</div>
             <div class="genre">${showMoviesGenre(genre_ids)}</div>
             <div class="movie-modal-overview">${overview}</div>
<!--             <div>${id}</div>-->
             <iframe  src="https://www.youtube.com/embed/${video_key}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>         
<!--             <div class="movie-modal-casting">Casting: ${casting}</div>-->
             <div class="movie-modal-crew">Direction: ${crew}</div>
             <div id="casting">
             <div id="casting-content"></div>
             </div>

         </div>
    </div>
        `;
        addCastingPhoto()
        // casting = [];
        main.appendChild(modal);
    });
}


function addPagination() {
    pagination += 1;
}

function addCastingPhoto() {
    let index = 0;
    let myCast = document.getElementById('casting-content');

    casting_photos.forEach(linkphotos => {

        let img = new Image();
        let div = document.createElement('div')
        div.setAttribute('id', 'nameActor' + index)
        div.classList.add('casting-photo')
        div.innerText = casting[index]

        img.src = imgPath + linkphotos;
        img.alt = linkphotos;

        div.appendChild(img);
        myCast.appendChild(div)
        index += 1

    })
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
    showMovieCrew(respData.crew);
}

function showMovieCrew(crewList) {
    crew = [];
    crewList.forEach(cast => {
        if (cast.department === "Directing"){
            crew.push(" " + cast.name);
        }
    });

    crewList.forEach(cast => {
        crew_photos.push(cast.profile_path)
    })

}

function showMovieCast(caster) {
    casting = []
    casting_photos = []
    caster.forEach(cast => {
        casting.push(" " + cast.name);
    });

    caster.forEach(cast => {
        casting_photos.push(cast.profile_path)
    })

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

        const {poster_path, name, vote_average, overview, backdrop_path} = movie;
        const movieEl = document.createElement('div');
        if (poster_path == null) {
        } else {
            movieEl.classList.add('movie');
            movieEl.setAttribute('id', index);
            movieEl.innerHTML = `
        <img src="${imgPath + poster_path}" alt="${name}">
        <div class="movie-info">
            <h3>${name}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">${overview}</div>
        `;
            main.appendChild(movieEl);
            // loading.classList.remove('show');
        }
        index += 1;
    });
    // console.log(movies);
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
        getMovies(api_url + api_search + searchTerm + '&language=' + languageSelected).then(r => console.log(r))
        search.value = '';
    }
});

// popularity.addEventListener('click', (e) => {
//     pagination = 1;
//     e.preventDefault();
//     main.innerHTML = "";
//     categorySelected = api_popularity;
//     getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));
//     addPagination();
// });
//
//
// vote.addEventListener('click', (e) => {
//     pagination = 1;
//     e.preventDefault();
//     main.innerHTML = "";
//     categorySelected = api_vote;
//     getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));
//     addPagination();
// });
//
// release.addEventListener('click', (e) => {
//     pagination = 1;
//     e.preventDefault();
//     main.innerHTML = "";
//     categorySelected = api_release;
//     getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));
//     addPagination();
// });

// fr.addEventListener('click', (e) => {
//     pagination = 1;
//     e.preventDefault();
//     main.innerHTML = "";
//     languageSelected = french;
//     getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));
//
// });
//
// eng.addEventListener('click', (e) => {
//     pagination = 1;
//     e.preventDefault();
//     main.innerHTML = "";
//     languageSelected = english;
//     getMovies(api_url + categorySelected + pagination + '&language=' + languageSelected).then(r => console.log(r));
//
// });


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




