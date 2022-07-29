import React from "react";
import {
    getPopularMovies,
    getMoviesByKeyword,
    getGenreList,
} from "../../fetcher";
import styled from "styled-components";
import MovieItem from "./MovieItem";
import SearchFilter from "./SearchFilter";
import debounce from "lodash.debounce";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesData: [],
            genres: [],
            keyword: "",
            year: "",
        };
    }

    onSearch = (state) => {
        this.setState({ ...state });
    };

    getMovies = async (keyword, year) => {
        const moviesData =
            this.state.keyword === ""
                ? await getPopularMovies()
                : await getMoviesByKeyword(keyword, year);
        console.log("moviesData", moviesData);
        this.setState({
            moviesData: moviesData.results,
        });
    };

    filterResults = (genreIds) => {
        console.log("genreIds", genreIds);
        const filteredMoviesData = this.state.moviesData.filter((movie) => {
            return genreIds.every((item) => {
                return movie.genre_ids.includes(item);
            });
        });
        console.log(filteredMoviesData.length);
        this.setState({
            moviesData: filteredMoviesData,
        });
    };

    getMoviesDebounced = debounce(
        async (keyword, year) => getMovies(keyword, year),
        200
    );

    async componentDidUpdate(prevProps, prevState) {
        if (
            prevState.keyword !== this.state.keyword ||
            prevState.year !== this.state.year
        ) {
            await this.getMovies(this.state.keyword, this.state.year);
        }
    }

    async componentDidMount() {
        const genres = await getGenreList();
        const popularMovies = await getPopularMovies();

        this.setState({
            moviesData: popularMovies.results,
            genres,
        });
    }

    render() {
        return (
            <SearchResultsWrapper>
                <div>
                    {!this.state.moviesData[0] && (
                        <NoResults>
                            {" "}
                            <h1>No results have been found!</h1>{" "}
                        </NoResults>
                    )}
                    {this.state.moviesData.map((movie, index) => (
                        <MovieItem
                            key={index}
                            movie={movie}
                            genres={this.state.genres}
                        />
                    ))}
                </div>
                <SearchFilter
                    genres={this.state.genres}
                    onChange={this.onSearch}
                    filterResults={this.filterResults}
                />
            </SearchResultsWrapper>
        );
    }
}

const SearchResultsWrapper = styled.div`
    display: flex;
`;

const NoResults = styled.div`
    width: 700px;
    height: 200px;
    margin: 15px;
`;

export default SearchResults;
