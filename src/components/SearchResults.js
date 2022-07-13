import React from "react";
import { getPopularMovies } from "../../fetcher";
import FilterBar from "./FilterBar";
import styled from "styled-components";

class SearchResults extends React.Component {
    state = {
        moviesData: [],
    };

    async componentDidMount() {
        const popularMovies = await getPopularMovies();
        this.setState({
            moviesData: popularMovies.results,
        });
        // console.log(this.state.moviesData);
    }

    render() {
        return (
            <SearchResultsWrapper>
                <MovieList>
                    <ul>
                        {this.state.moviesData.map((item, index) => (
                            <li key={index}>
                                {" "}
                                {item.original_title}, rated:{" "}
                                {item.vote_average}
                            </li>
                        ))}
                    </ul>
                </MovieList>
                <FilterBar />
            </SearchResultsWrapper>
        );
    }
}

const SearchResultsWrapper = styled.div`
    display: flex;
`;

const MovieList = styled.div`
    border: 2px solid black;
`;

export default SearchResults;
