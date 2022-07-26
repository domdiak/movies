import axios from "axios";
// import { API_KEY } from "./secrets";
const language = "en-US";
const sortBy = "popularity.desc";

export async function getPopularMovies() {
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&sort_by=${sortBy}`
        );
        // console.log("response from getPopularMovies", res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getMoviesByKeyword(query, year) {
    // console.log({ query });
    // console.log({ year });
    const params = {
        query,
        ...(year.length > 3 ? { year: parseInt(year) } : {}),
    };
    // console.log({ params });
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}`,
            { params }
        );
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
        return res.data.genres;
    } catch (error) {
        console.error(error);
    }
}
