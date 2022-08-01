import axios from "axios";
// import { API_KEY } from "./secrets";
const language = "en-US";

// Min vote:  vote_average.gte
// Genres: with_genres (defintion: Comma separated value of genre ids that you want to include in the results.)

// Check if API KEY goes into params as well

export async function getPopularMovies(genres) {
    console.log("getPopularMovies is triggered");
    let genresToString;
    if (genres) {
        genresToString = genres.join(",");
    }
    const params = {
        with_genres: genresToString,
    };

    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.REACT_APP_API_KEY}`,
            { params }
        );
        // console.log("response", res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getMoviesByKeyword(query, year, genres) {
    console.log("getMoviesByKeyword is triggered");
    console.log("genres", genres);
    const params = {
        query,
        ...(year.length > 3 ? { year: parseInt(year) } : {}),
    };
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}`,
            { params }
        );

        // console.log("res.data.results", res.data.results);

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
