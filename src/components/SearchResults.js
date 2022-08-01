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
                { name: "en", isChecked: false },
                { name: "de", isChecked: false },
                { name: "fr", isChecked: false },
                { name: "it", isChecked: false },
            ],
            votesFilter: [
                { value: 6, isChecked: false },
                { value: 6.5, isChecked: false },
                { value: 7, isChecked: false },
                { value: 8, isChecked: false },
            ],
            total: 0,
        };
    }

    onSearch = (state) => {
        this.setState({ ...state });
    };

    getMovies = async ({ keyword, year, genres }) => {
        const moviesData =
            this.state.keyword === ""
                ? await getPopularMovies(genres)
                : await getMoviesByKeyword(keyword, year, genres);
        this.setState({
            moviesData: moviesData.results,
            total: moviesData.total_results,
        });
    };

    getGenreIds = (genres) => {
        return genres.filter((genre) => genre.isChecked).map((item) => item.id);
    };

    async componentDidUpdate(prevProps, prevState) {
        console.log("votesFilter", this.state.votesFilter);
        const params = {
            keyword: this.state.keyword,
            year: this.state.year,
            genres: this.getGenreIds(this.state.genres),
        };
        if (
            prevState.keyword !== this.state.keyword ||
            prevState.year !== this.state.year ||
            prevState.genres !== this.state.genres
        ) {
            await this.getMovies(params);
        }
    }

    handleChangeFilters = (filterValue, target) => {
        console.log("filterValue", filterValue);
        console.log("target", target);
        if (target === "genre") {
            const newGenres = this.state.genres.map((genre) => {
                if (filterValue === genre.id) {
                    const updatedGenre = {
                        ...genre,
                        isChecked: !genre.isChecked,
                    };
                    return updatedGenre;
                }
                return genre;
            });

            this.setState({
                genres: newGenres,
            });
        }
        if (target === "vote") {
            const newVotesFilter = this.state.votesFilter.map((vote) => {
                console.log("filterValue)", filterValue);
                console.log(
                    "this.state.votesFilter.value)",
                    this.state.votesFilter.value
                );
                if (filterValue === vote.value) {
                    const updatedVoteFilter = {
                        ...vote,
                        isChecked: !vote.isChecked,
                    };
                    console.log(updatedVoteFilter);
                    return updatedVoteFilter;
                }
                return vote;
            });
            this.setState({
                votesFilter: newVotesFilter,
            });
        }
        // if (target === "language") {

        // }
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
                            const selectedIds = this.getGenreIds(
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
                    languages={this.state.languagesFilter}
                    votes={this.state.votesFilter}
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
