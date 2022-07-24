import { rest } from "msw";
import { setupServer } from "msw/node";

import popularMoviesData from "./getPopularMoviesData.json";
import genreListData from "./getGenreListData.json";
const language = "en-US";
const sortBy = "popularity.desc";
const POPULARMOVIES_PATH = `https://api.themoviedb.org/3/discover/movie/`;
const GENRES_PATH = `https://api.themoviedb.org/3/genre/movie/list`;

export const handlers = [
    rest.get(POPULARMOVIES_PATH, (req, res, ctx) => {
        const language = req.url.searchParams.get("language");
        const sortBy = req.url.searchParams.get("sortBy");
        return res(ctx.status(200), ctx.json(popularMoviesData));
    }),
    rest.get(GENRES_PATH, (req, res, ctx) => {
        const language = req.url.searchParams.get("language");

        return res(ctx.status(200), ctx.json(genreListData));
    }),
];
