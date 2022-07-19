import { rest } from "msw";
import fakeData from "./fakeData.json";
const language = "en-US";
const sortBy = "popularity.desc";

export const handlers = [
    rest.get(
        `https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&sort_by=${sortBy}`,
        (req, res, ctx) => {
            return res(ctx.json({ erroMessage: "hello" }));
        }
    ),
];
