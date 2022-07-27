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

    getMoviesDebounced = debounce(
        async (keyword, year) => getMoviesByKeyword(keyword, year),
        200
    );

    async componentDidUpdate(prevProps, prevState) {
        if (
            // loads popularMovies if keyword input is empty
            prevState.keyword !== this.state.keyword &&
            this.state.keyword === ""
        ) {
            const popularMovies = await getPopularMovies();
            this.setState({
                moviesData: popularMovies.results,
            });
        } else if (
            prevState.keyword !== this.state.keyword ||
            prevState.year !== this.state.year
        ) {
            // const moviesbyKeyword = await getMoviesByKeyword(
            //     this.state.keyword,
            //     this.state.year
            // );
            const moviesbyKeyword = await this.getMoviesDebounced(
                this.state.keyword,
                this.state.year
            );
            console.log(this.state.keyword);
            console.log("moviesbyKeyword", moviesbyKeyword);
            this.setState({
                moviesData: moviesbyKeyword.results,
            });
        }
    }

    async componentDidMount() {
        const genres = await getGenreList();
        const popularMovies = await getPopularMovies();

        this.setState({
            moviesData: popularMovies.results,
            genres: genres,
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
