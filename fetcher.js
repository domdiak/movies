import axios from "axios";
// import { API_KEY } from "./secrets";
const language = "en-US";
const sortBy = "popularity.desc";

export async function getPopularMovies() {
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&sort_by=${sortBy}`
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getMoviesByKeyword(keyword) {
    console.log("getMoviesByKeyword in action");
    console.log({ keyword });
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&query=${keyword}`
        );
        console.log(res.data.results);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getGenreList() {
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
        );
        console.log(res.data.results);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
