import React from "react";
import {
    getPopularMovies,
    getMoviesByKeyword,
    getGenreList,
} from "../../../fetcher";
import styled from "styled-components";
import Spinner from "./Spinner";
import SearchCriteria from "../../components/searchcriteria";
import MovieList from "../../components/movielist";
import debounce from "lodash.debounce";
import { LANGUAGES } from "../../constants/filter";
import { Route, Routes } from "react-router-dom";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesData: [],
            moviesFavourites: [],
            moviesSaved: [],
            keyword: "",
            year: "",
            currentPage: 1,
            totalPages: 500,
            isLoading: true,
            genres: [],
            languages: LANGUAGES,
            selectedLanguage: null,
            votes: [
                { name: 6, id: 6, isChecked: false },
                { name: 6.5, id: 6.5, isChecked: false },
                { name: 7, id: 7, isChecked: false },
                { name: 8, id: 8, isChecked: false },
            ],
            total: 0,
        };
    }

    async componentDidMount() {
        const genres = await getGenreList();
        const popularMovies = await getPopularMovies();

        const updatedGenres = genres.map((genre) => {
            return { ...genre, isChecked: false };
        });

        this.setState({
            moviesData: popularMovies.results,
            genres: updatedGenres,
            isLoading: false,
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        const { keyword, year, genres, votes, selectedLanguage, currentPage } =
            this.state;

        const params = {
            keyword: keyword,
            year: year,
            genres: this.getFilterIds(genres),
            votes: this.getFilterIds(votes),
            selectedLanguage: selectedLanguage,
            currentPage: currentPage,
        };
        if (
            prevState.keyword !== keyword ||
            prevState.year !== year ||
            prevState.genres !== genres ||
            prevState.votes !== votes ||
            prevState.selectedLanguage !== selectedLanguage ||
            prevState.currentPage !== currentPage
        ) {
            await this.fetchMovies(params);
        }
    }

    onSearch = (keyword, year) => {
        this.setState({
            keyword,
            year,
        });
    };

    delayLoading = () => {
        setTimeout(() => {
            this.setState({
                isLoading: false,
            });
        }, 100);
    };

    fetchMovies = async ({
        keyword,
        year,
        genres,
        votes,
        selectedLanguage,
        currentPage,
    }) => {
        this.setState({
            isLoading: true,
        });

        const moviesData =
            this.state.keyword === ""
                ? await getPopularMovies(
                      genres,
                      votes,
                      selectedLanguage,
                      currentPage
                  )
                : await getMoviesByKeyword(keyword, year, genres, currentPage);
        this.setState({
            moviesData: moviesData.results,
            total: moviesData.total_results,
        });

        this.delayLoading();
    };

    addToMovieList = (movie, movieGroup) => {
        this.setState((prevState) => ({
            [movieGroup]: [...prevState[movieGroup], movie],
        }));

        this.state[movieGroup].some((savedItem) => {
            if (savedItem.id === movie.id) {
                const updatedMoviesSaved = this.state[movieGroup].filter(
                    (obj) => {
                        return obj.id !== movie.id;
                    }
                );
                this.setState({
                    [movieGroup]: updatedMoviesSaved,
                });
            }
        });
    };

    handleChangeFilters = (filterValue, filterType) => {
        if (filterType === "languages") {
            this.setState({
                selectedLanguage: filterValue,
            });
        } else {
            const newFilterGroup = this.updateFilterGroup(
                filterValue,
                filterType
            );
            this.setState({ [filterType]: newFilterGroup });
        }
    };

    updateFilterGroup = (filterValue, filterType) => {
        const filterGroup = this.state[filterType];
        return filterGroup.map((filter) => {
            if (filterValue === filter.id) {
                const updatedFilter = {
                    ...filter,
                    isChecked: !filter.isChecked,
                };
                return updatedFilter;
            }

            return filter;
        });
    };

    getFilterIds = (filterGroup) => {
        return filterGroup
            .filter((filter) => filter.isChecked)
            .map((item) => item.id);
    };

    getMoviesDebounced = debounce(
        async (keyword, year) => this.fetchMovies(keyword, year),
        200
    );

    handlePageChange = ({ selected }) => {
        this.setState({ currentPage: selected + 1 });
    };

    // This needs to be renamed
    // getRightMovies = (pathname) => {
    //     const movies =
    //         pathname === "/"
    //             ? this.state.moviesData
    //             : pathname === "/favourites"
    //             ? this.state.moviesFavourites
    //             : this.state.moviesSaved;

    //     return movies;
    // };

    render() {
        return (
            <SearchResultsWrapper>
                {this.state.isLoading && <Spinner />}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <MovieList
                                total={this.state.total}
                                moviesData={this.state.moviesData}
                                isLoading={this.state.isLoading}
                                genres={this.state.genres}
                                getFilterIds={this.getFilterIds}
                                addToMovieList={this.addToMovieList}
                                handlePageChange={this.handlePageChange}
                                totalPages={this.state.totalPages}
                            />
                        }
                    />
                    <Route
                        path="/favourites"
                        element={
                            <MovieList
                                total={this.state.total}
                                moviesData={this.state.moviesFavourites}
                                isLoading={this.state.isLoading}
                                genres={this.state.genres}
                                getFilterIds={this.getFilterIds}
                                addToMovieList={this.addToMovieList}
                                handlePageChange={this.handlePageChange}
                                totalPages={this.state.totalPages}
                            />
                        }
                    />
                    <Route
                        path="/saved"
                        element={
                            <MovieList
                                total={this.state.total}
                                moviesData={this.state.moviesSaved}
                                isLoading={this.state.isLoading}
                                genres={this.state.genres}
                                getFilterIds={this.getFilterIds}
                                addToMovieList={this.addToMovieList}
                                handlePageChange={this.handlePageChange}
                                totalPages={this.state.totalPages}
                            />
                        }
                    />
                </Routes>
                <SearchCriteria
                    genres={this.state.genres}
                    languages={this.state.languages}
                    votes={this.state.votes}
                    onSearch={this.onSearch}
                    handleChangeFilters={this.handleChangeFilters}
                />
            </SearchResultsWrapper>
        );
    }
}

const SearchResultsWrapper = styled.div`
    display: flex;
`;

export default SearchResults;
