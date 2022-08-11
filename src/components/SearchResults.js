import React from "react";
import {
    getPopularMovies,
    getMoviesByKeyword,
    getGenreList,
} from "../../fetcher";
import styled from "styled-components";
import MovieItem from "./MovieItem";
import SearchFilter from "./SearchFilter";
import Pagination from "./Pagination";
import debounce from "lodash.debounce";
import ReactPaginate from "react-paginate";
import { Circles } from "react-loader-spinner";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
            moviesData: [],
            moviesWatched: [],
            moviesSaved: [],
            genres: [],
            keyword: "",
            year: "",
            currentPage: 1,
            totalPages: 500,
            languages: [
                { name: "English", id: "en", isChecked: false },
                { name: "German", id: "de", isChecked: false },
                { name: "French", id: "fr", isChecked: false },
                { name: "Italian", id: "it", isChecked: false },
            ],
            votes: [
                { name: 6, id: 6, isChecked: false },
                { name: 6.5, id: 6.5, isChecked: false },
                { name: 7, id: 7, isChecked: false },
                { name: 8, id: 8, isChecked: false },
            ],
            total: 0,
        };
    }

    onSearch = (state) => {
        this.setState({ ...state });
    };

    getMovies = async ({
        keyword,
        year,
        genres,
        votes,
        languages,
        currentPage,
    }) => {
        const moviesData =
            this.state.keyword === ""
                ? await getPopularMovies(genres, votes, languages, currentPage)
                : await getMoviesByKeyword(keyword, year, genres, currentPage);
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

    addToMovieList = (movie, actionType) => {
        this.setState((prevState) => ({
            [actionType]: [...prevState[actionType], movie],
        }));

        this.state[actionType].some((savedItem) => {
            if (savedItem.id === movie.id) {
                const updatedMoviesSaved = this.state[actionType].filter(
                    (obj) => {
                        return obj.id !== movie.id;
                    }
                );

                this.setState({
                    [actionType]: updatedMoviesSaved,
                });
            }
        });
    };

    async componentDidUpdate(prevProps, prevState) {
        // console.log("this.state.currentPage", this.state.currentPage);
        const params = {
            keyword: this.state.keyword,
            year: this.state.year,
            genres: this.getFilterIds(this.state.genres),
            votes: this.getFilterIds(this.state.votes),
            languages: this.getFilterIds(this.state.languages),
            currentPage: this.state.currentPage,
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
        if (prevState.currentPage !== this.state.currentPage) {
            await this.getMovies(params);
        }
    }

    handleChangeFilters = (filterValue, filterType) => {
        const filterGroup =
            filterType === "genre"
                ? this.state.genres
                : filterType === "vote"
                ? this.state.votes
                : this.state.languages;

        const newFilterGroup = filterGroup.map((filter) => {
            // manually resets all filters back to false
            if (filterType === "language") {
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
        if (filterType === "genre") {
            this.setState({
                genres: newFilterGroup,
            });
        } else if (filterType === "vote") {
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

    handlePageChange({ selected }) {
        this.setState({ currentPage: selected + 1 });
    }

    render() {
        return (
            <SearchResultsWrapper>
                <MovieListWrapper>
                    {!this.state.moviesData[0] && (
                        <NoResults>
                            {" "}
                            <h1>No results have been found!</h1>{" "}
                        </NoResults>
                    )}

                    <p>Total results: {this.state.total}</p>
                    <Pagination
                        onPageChange={this.handlePageChange}
                        totalPages={this.state.totalPages}
                    />
                    {window.location.pathname === "/" &&
                        this.state.moviesData
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
                                    addToMovieList={this.addToMovieList}
                                />
                            ))}
                    {window.location.pathname === "/watched" &&
                        this.state.moviesWatched
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
                                    addToMovieList={this.addToMovieList}
                                />
                            ))}
                    {window.location.pathname === "/saved" &&
                        this.state.moviesSaved
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
                                    addToMovieList={this.addToMovieList}
                                />
                            ))}
                </MovieListWrapper>
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

const MovieListWrapper = styled.div`
    margin-left: 45px;
    margin-right: 15px;
`;

export default SearchResults;
