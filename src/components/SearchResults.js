import React from "react";
import {
    getPopularMovies,
    getMoviesByKeyword,
    getGenreList,
} from "../../fetcher";
// import FilterBar from "./FilterBar";
import styled from "styled-components";
// import Theme from "../../theme/theme";
import MovieItem from "./MovieItem";
import SearchFilter from "./SearchFilter";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesData: [],
            genres: [],
            keyword: "",
            year: "",
            error: {
                keyword: false,
                year: false,
            },
        };
        this.handleChange = this.handleChange.bind(this);
    }
    async handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log("keyword", this.state.keyword);
        console.log("year", this.state.year);
    }

    async componentDidUpdate(prevProps, prevState) {
        if (
            !this.state.keyword == "" &&
            prevState.keyword !== this.state.keyword
        ) {
            this.setState({
                error: { ...this.state.error.year, keyword: false },
            });
            // needs to make an api call
        } else if (
            // loads popularMovies if keyword input is empty
            prevState.keyword !== this.state.keyword &&
            this.state.keyword === ""
        ) {
            const popularMovies = await getPopularMovies();
            this.setState({
                moviesData: popularMovies.results,
            });
        } else if (
            // Shows keyword error if input is empty
            this.state.keyword === "" &&
            this.state.year.length > 3 &&
            prevState.year !== this.state.year
        ) {
            this.setState({
                error: { ...this.state.error.year, keyword: true },
            });
            console.log(this.state.error.keyword);
        } else if (
            prevState.keyword !== this.state.keyword ||
            prevState.year !== this.state.year
        ) {
            const moviesbyKeyword = await getMoviesByKeyword(
                this.state.keyword,
                this.state.year
            );
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
                <SearchFilter />
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
