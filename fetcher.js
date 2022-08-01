import axios from "axios";
// import { API_KEY } from "./secrets";
const language = "en-US";
const sortBy = "popularity.desc";

// Min vote:  vote_average.gte
// Genres: with_genres (defintion: Comma separated value of genre ids that you want to include in the results.)

// Check if API KEY goes into params as well

export async function getPopularMovies(genres) {
    let genresToString;
    if (genres) {
        genresToString = genres.join(",");
    }
    console.log(genresToString);
    const params = {
        with_genres: genresToString,
    };
    console.log(params);
    console.log("genres", genres);
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.REACT_APP_API_KEY}`,
            { params }
        );
        console.log("response", res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getMoviesByKeyword(query, year) {
    const params = {
        query,
        ...(year.length > 3 ? { year: parseInt(year) } : {}),
    };
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
