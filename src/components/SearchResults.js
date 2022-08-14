import React from "react";
import {
    getPopularMovies,
    getMoviesByKeyword,
    getGenreList,
} from "../../fetcher";
import styled from "styled-components";
import MovieItem from "./MovieItem";
import Spinner from "./Spinner";
import SearchCriteria from "./SearchCriteria";
import MoviesList from "./MoviesList";
import Pagination from "./Pagination";
import debounce from "lodash.debounce";
import { LANGUAGES } from "../constants/filter";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
            moviesData: [],
            moviesWatched: [],
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

    handleChangeFilters = (filterValue, filterType) => {
        console.log("value", filterValue, "type", filterType);
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

    getMoviesDebounced = debounce(
        async (keyword, year) => this.fetchMovies(keyword, year),
        200
    );

    handlePageChange({ selected }) {
        this.setState({ currentPage: selected + 1 });
    }

    render() {
        return (
            <SearchResultsWrapper>
                {this.state.isLoading && <Spinner />}
                <MoviesList
                    total={this.state.total}
                    moviesData={this.state.moviesData}
                    isLoading={this.state.isLoading}
                    genres={this.state.genres}
                    getFilterIds={this.getFilterIds}
                    addToMovieList={this.addToMovieList}
                />

                <SearchCriteria
                    genres={this.state.genres}
                    languages={this.state.languages}
                    votes={this.state.votes}
                    onSearch={this.onSearch}
                    handleChangeFilters={this.handleChangeFilters}
                />

                <Pagination
                    onPageChange={this.handlePageChange}
                    totalPages={this.state.totalPages}
                />
            </SearchResultsWrapper>
        );
    }
}

const SearchResultsWrapper = styled.div`
    display: flex;
`;

// const NoResults = styled.div`
//     padding: 10px;
//     box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
//     width: 700px;
//     height: 200px;
//     margin: 35px;
// `;
// const CountWrapper = styled.p`
//     height: 20px;
//     margin-left: 15px;
// `;

// const MovieListWrapper = styled.div`
//     margin-left: 45px;
//     margin-right: 15px;
//     margin-top: 15px;
//     min-width: 700px;
// `;

export default SearchResults;
