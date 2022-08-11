import axios from "axios";
const language = "en-US";

// Check if API KEY goes into params as well

export async function getPopularMovies(
    genres,
    votes = [],
    languages = [],
    currentPage
) {
    let genresToString;
    if (genres) {
        genresToString = genres.join(",");
    }

    let minVote;
    if (votes.length > 0) {
        minVote = Math.min(...votes);
    }

    const params = {
        with_genres: genresToString,
        "vote_average.gte": minVote,
        with_original_language: languages.join(),
        page: currentPage,
    };

    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.REACT_APP_API_KEY}`,
            { params }
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getMoviesByKeyword(query, year, genres, currentPage) {
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
