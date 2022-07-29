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
            genresFilter: [],
            languagesFilter: [
                { name: "en", state: false },
                { name: "de", state: false },
                { name: "fr", state: false },
                { name: "it", state: false },
            ],
            votesFilter: [
                { value: 6, state: false },
                { value: 6.5, state: false },
                { value: 7, state: false },
                { value: 8, state: false },
            ],
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
        this.setState({
            moviesData: moviesData.results,
        });
    };

    filterResults = (genreIds) => {
        this.setState({
            genresFilter: genreIds,
        });
    };

    movieFilter = (genreIds) => {
        return genreIds.every((item) => {
            return movie.genre_ids.includes(item);
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
                    {this.state.moviesData
                        .filter((movie) => {
                            return this.state.genresFilter.every((item) => {
                                return movie.genre_ids.includes(item);
                            });
                        })
                        .map((movie, index) => (
                            <MovieItem
                                key={index}
                                movie={movie}
                                genres={this.state.genres}
                            />
                        ))}
                </div>
                <SearchFilter
                    genres={this.state.genres}
                    languages={this.state.languagesFilter}
                    votes={this.state.votesFilter}
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
