const API_TOKEN = "f64397b48cc286cd6f98e44421c67508";

export function getFilmFromApi(text, page) {
    const url = "https://api.themoviedb.org/3/search/movie?api_key="+API_TOKEN+"&query="+text+"&page="+page;
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error(error));
}

export function getImageFromApi(path) {
    return "https://image.tmdb.org/t/p/w300"+path;
}

export function getFilmDetailsFromApi(filmId) {
    const url = "https://api.themoviedb.org/3/movie/"+filmId+"?api_key="+API_TOKEN;
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error(error));
}