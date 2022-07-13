import React from "react";
import { getPopularMovies } from "./fetcher";

class SearchResults extends React.Component {
    state = {
        moviesData: [],
    };

    async componentDidMount() {
        const popularMovies = await getPopularMovies();
        this.setState({
            moviesData: popularMovies.results,
        });
        console.log(this.state.moviesData);
    }

    render() {
        return (
            <div>
                <h1> SearchResults.js </h1>
                <h2>
                    {" "}
                    How many movies got rendered? {
                        this.state.moviesData.length
                    }{" "}
                </h2>
                <ul>
                    {this.state.moviesData.map((item, index) => (
                        <li>
                            {" "}
                            {item.original_title}, rated: {item.vote_average}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default SearchResults;
