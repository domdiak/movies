import axios from "axios";
// import { API_KEY } from "./secrets";

export async function getPopularMovies() {
    const language = "en-US";
    const sortBy = "popularity.desc";

    try {
        console.log(process.env.REACT_APP_API_KEY);
        const res = await axios.get(
            `https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&sort_by=${sortBy}`
        );
        console.log("res.data", res.data);
        console.log("res.data[0]", res.data.results[0]);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
