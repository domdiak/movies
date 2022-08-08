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
            languages: [
                { name: "English", id: "en", isChecked: false },
                { name: "German", id: "de", isChecked: false },
                { name: "French", id: "fr", isChecked: false },
                { name: "Italian", id: "it", isChecked: false },
            ],
            votes: [
                { id: 6, isChecked: false },
                { id: 6.5, isChecked: false },
                { id: 7, isChecked: false },
                { id: 8, isChecked: false },
            ],
            total: 0,
        };
    }

    onSearch = (state) => {
        this.setState({ ...state });
    };

    getMovies = async ({ keyword, year, genres, votes, languages }) => {
        const moviesData =
            this.state.keyword === ""
                ? await getPopularMovies(genres, votes, languages)
                : await getMoviesByKeyword(keyword, year, genres);
        this.setState({
            moviesData: moviesData.results,
            total: moviesData.total_results,
        });
    };

    getFilterIds = (filterGroup) => {
        return filterGroup
            .filter((filter) => filter.isChecked)
            .map((item) => item.id);
    };

    async componentDidUpdate(prevProps, prevState) {
        console.log(this.state.languages);
        // console.log("votes", this.state.votes);
        const params = {
            keyword: this.state.keyword,
            year: this.state.year,
            genres: this.getFilterIds(this.state.genres),
            votes: this.getFilterIds(this.state.votes),
            languages: this.getFilterIds(this.state.languages),
        };
        if (
            prevState.keyword !== this.state.keyword ||
            prevState.year !== this.state.year ||
            prevState.genres !== this.state.genres ||
            prevState.votes !== this.state.votes ||
            prevState.languages !== this.state.languages
        ) {
            await this.getMovies(params);
        }
    }

    handleChangeFilters = (filterValue, target) => {
        const filterGroup =
            target === "genre"
                ? this.state.genres
                : target === "vote"
                ? this.state.votes
                : this.state.languages;

        const newFilterGroup = filterGroup.map((filter) => {
            // manually resets all filters back to false
            if (target === "language") {
                if (filterValue !== filter.id) {
                    const resetFilter = {
                        ...filter,
                        isChecked: false,
                    };
                    return resetFilter;
                }
            }
            if (filterValue === filter.id) {
                const updatedFilter = {
                    ...filter,
                    isChecked: !filter.isChecked,
                };
                return updatedFilter;
            }

            return filter;
        });
        if (target === "genre") {
            this.setState({
                genres: newFilterGroup,
            });
        } else if (target === "vote") {
            this.setState({
                votes: newFilterGroup,
            });
        } else {
            this.setState({
                languages: newFilterGroup,
            });
        }
    };

    getMoviesDebounced = debounce(
        async (keyword, year) => this.getMovies(keyword, year),
        200
    );

    async componentDidMount() {
        const genres = await getGenreList();
        const popularMovies = await getPopularMovies();

        const updatedGenres = genres.map((genre) => {
            return { ...genre, isChecked: false };
        });

        this.setState({
            moviesData: popularMovies.results,
            genres: updatedGenres,
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
                    <p>Total results: {this.state.total}</p>
                    {this.state.moviesData
                        .filter((movie) => {
                            const selectedIds = this.getFilterIds(
                                this.state.genres
                            );

                            return selectedIds.every((item) => {
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
                    languages={this.state.languages}
                    votes={this.state.votes}
                    onChange={this.onSearch}
                    handleChangeFilters={this.handleChangeFilters}
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
