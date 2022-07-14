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
    constructor(props) {
        super(props);
        this.state = {
            moviesData: [],
            genres: [],
            keyword: "",
            year: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }
    async handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
        const moviesbyKeyword = await getMoviesByKeyword(
            this.state.keyword,
            this.state.year
        );
        this.setState({
            moviesData: moviesbyKeyword.results,
        });
        // console.log(this.state.moviesData);
    }

    async componentDidMount() {
        const genres = await getGenreList();
        const popularMovies = await getPopularMovies();
        this.setState({
            moviesData: popularMovies.results,
            genres: genres,
        });
        // console.log(popularMovies.results);
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
                <FilterBarContainer>
                    <SearchBarContainer>
                        <input
                            type="text"
                            name="keyword"
                            placeholder="Search by name"
                            value={this.state.keyword}
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            name="year"
                            placeholder="Search by year"
                            onChange={this.handleChange}
                        />
                    </SearchBarContainer>
                    <FilterMenuContainer>
                        <h2> Select genre(s) </h2>
                        <h4> Placerholder </h4>
                        <h4> Placerholder </h4>
                        <h4> Placerholder </h4>
                        <h4> Placerholder </h4>
                        <h4> Placerholder </h4>
                        <h4> Placerholder </h4>
                        <h2> Select min. vote </h2>
                        <h2> Select language </h2>
                    </FilterMenuContainer>
                </FilterBarContainer>
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

const FilterBarContainer = styled.div`
    border: 2px solid black;
`;

const SearchBarContainer = styled.div`
    border: 2px solid black;
    display: flex;
    flex-direction: column;
`;

const FilterMenuContainer = styled.div``;

export default SearchResults;
