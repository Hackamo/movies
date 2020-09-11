let pagination = 1
const french = 'fr'
const english = 'en-us'
let languageSelected = french

const api_url = 'https://api.themoviedb.org/3'
let api_popularity = '/discover/tv?api_key=399af3fea42fd17a119ef910e475a6c5&original_name&sort_by=popularity.desc&include_adult=false&include_video=false&page=';
let api_search = '/search/tv?&api_key=399af3fea42fd17a119ef910e475a6c5&query=';
let api_vote = '/discover/tv?api_key=399af3fea42fd17a119ef910e475a6c5&original_name&sort_by=vote_count.desc&include_adult=false&include_video=false&page='
let api_release = '/discover/tv?api_key=399af3fea42fd17a119ef910e475a6c5&original_name&sort_by=release_date.desc&include_adult=false&include_video=false&page='
let api_revenue = '/discover/tv?api_key=399af3fea42fd17a119ef910e475a6c5&original_name&sort_by=revenue.desc&include_adult=false&include_video=false&page='
let api_note = '/discover/tv?api_key=399af3fea42fd17a119ef910e475a6c5&original_name&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page='


const imgPath = 'https://image.tmdb.org/t/p/w1280';
let categorySelected = api_popularity


const main = document.getElementById('main');
const form = document.getElementById('form');

const popularity = document.getElementById('popularity');
const vote = document.getElementById('vote');
const release = document.getElementById('release');
const revenue = document.getElementById('revenue');
const note = document.getElementById('note');
const fr = document.getElementById('fr');
const eng = document.getElementById('eng');

const nav = document.getElementById('mainNav')


const search = document.getElementById('search');
const loading = document.querySelector('.loading');

// initially get fav Series
getSeries(api_url + categorySelected + pagination + '&language=' + languageSelected)
addPagination()

function addPagination() {
    pagination += 1
}


async function getSeries(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showSeries(respData.results)
}


function showSeries(Series) {
    //clear main
    // main.innerHTML = "";
    Series.forEach(serie => {
        const {poster_path, original_name, vote_average, overview, backdrop_path} = serie;
        const serieEl = document.createElement('div');
        if (poster_path == null) {
        }
        else {
            serieEl.classList.add('serie');
            serieEl.innerHTML = `
        <img src="${imgPath + poster_path}" alt="${original_name}">
        <div class="serie-info">
            <h3>${original_name}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Résumé</h3>
        ${overview}
        </div>
        `;
            main.appendChild(serieEl)
            // loading.classList.remove('show');
        }
    });
    console.log(Series)

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
        getSeries(api_url + api_search + searchTerm)
        search.value = '';
    }
});

popularity.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_popularity;
    getSeries(api_url + categorySelected + pagination + '&language=' + languageSelected);
    addPagination();
});



vote.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_vote;
    getSeries(api_url + categorySelected + pagination + '&language=' + languageSelected);
    addPagination();
});

release.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_release;
    getSeries(api_url + categorySelected + pagination + '&language=' + languageSelected);
    addPagination();
    getSeries(api_url + categorySelected + pagination + '&language=' + languageSelected);
    addPagination();
});

revenue.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    categorySelected = api_revenue;
    getSeries(api_url + categorySelected + pagination + '&language=' + languageSelected);
    addPagination();

});

fr.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    languageSelected = french;
    getSeries(api_url + categorySelected + pagination + '&language=' + languageSelected);

});

eng.addEventListener('click', (e) => {
    pagination = 1;
    e.preventDefault();
    main.innerHTML = "";
    languageSelected = english;
    getSeries(api_url + categorySelected + pagination + '&language=' + languageSelected);

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
    setTimeout(getSeries(api_url + categorySelected + pagination + '&language=' + languageSelected), 1000)
    addPagination()
}


