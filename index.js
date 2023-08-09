import { MOVIE_API_KEY, BASE_URL } from "/config.js"

const getArticles = document.getElementById("getArticles")


async function fetchData(link) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: MOVIE_API_KEY
        }
    };
    let response = await fetch(`${BASE_URL}${link}`, options)
    let data = await response.json()
    return data
}



async function fetchPopularMovies() {

    const link = "popular?language=en-US&page=1"
    const data = await fetchData(link)
    return data.results
}

async function createHTML(films) {


    let html = "<div class='popular-films'>";

    films.forEach(film => {
        html += `
    <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${film.original_title}</h5>
            <p class="card-text">${film.overview}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    `;
    });

    html += "</div>"

    return html;
}

async function showMovies() {
    let popularFilmsDiv = document.getElementById("popular-movies")

    const films = await fetchPopularMovies()
    const html = await createHTML(films)
    popularFilmsDiv.innerHTML = html;
}

async function addEventListeners() {
    getArticles.addEventListener("click", showMovies)
    return "success"
}



async function mountApp() {
    await addEventListeners()

}


mountApp()
