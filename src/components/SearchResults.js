import React from "react";
import {
    getPopularMovies,
    getMoviesByKeyword,
    getGenreList,
} from "../../fetcher";
import FilterBar from "./FilterBar";
import styled from "styled-components";
import MovieItem from "./MovieItem";

class SearchResults extends React.Component {
    state = {
        moviesData: [],
        genres: [],
    };

    async componentDidMount() {
        const genres = await getGenreList();
        const popularMovies = await getPopularMovies();
        this.setState({
            moviesData: popularMovies.results,
            genres: genres,
        });
        console.log(popularMovies.results);
        // console.log("state", this.state.genres);
    }

    render() {
        return (
            <SearchResultsWrapper>
                <MovieList>
                    {this.state.moviesData.map((movie, index) => (
                        <MovieItem
                            key={index}
                            movie={movie}
                            genres={this.state.genres}
                        />
                    ))}
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
