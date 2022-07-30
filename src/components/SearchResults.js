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

    handleChangeFilters = (genreId) => {
        console.log("works");
        const updatedGenreIndex = this.state.genres.findIndex((genre) => {
            return genre.id === genreId;
        });

        const updatedGenre = this.state.genres.find((genre) => {
            return genre.id === genreId;
        });

        const newGenres = [...this.state.genres];

        newGenres.splice(updatedGenreIndex, 1, {
            ...updatedGenre,
            isChecked: !updatedGenre.isChecked,
        });

        this.setState({
            genres: newGenres,
        });
    };

    getMoviesDebounced = debounce(
        async (keyword, year) => this.getMovies(keyword, year),
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

        const updatedGenres = genres.map((genre) => {
            return { ...genre, isChecked: false };
        });

        this.setState({
            moviesData: popularMovies.results,
            genres: updatedGenres,
        });
    }

    render() {
        console.log(this.state.genres);
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
