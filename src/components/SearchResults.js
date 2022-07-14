import React from "react";
import { getPopularMovies } from "../../fetcher";
import FilterBar from "./FilterBar";
import styled from "styled-components";
import MovieItem from "./MoveItem";

class SearchResults extends React.Component {
    state = {
        moviesData: [],
    };

    async componentDidMount() {
        const popularMovies = await getPopularMovies();
        this.setState({
            moviesData: popularMovies.results,
        });
        console.log(popularMovies.results);
    }

    render() {
        return (
            <SearchResultsWrapper>
                <MovieList>
                    {this.state.moviesData.map((item, index) => (
                        <MovieItem
                            key={index}
                            title={item.original_title}
                            genre={item.genre_ids}
                            overview={item.overview}
                            rating={item.vote_average}
                            img={item.poster_path}
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
