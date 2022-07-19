import React from "react";
import {
    getPopularMovies,
    getMoviesByKeyword,
    getGenreList,
} from "../../fetcher";
// import FilterBar from "./FilterBar";
import styled from "styled-components";
import Theme from "../../theme/theme";
import MovieItem from "./MovieItem";
import { GoSearch, GoCalendar } from "react-icons/go";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesData: [],
            genres: [],
            keyword: "",
            year: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }
    async handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
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
        // console.log(popularMovies.results);
        // console.log("state", this.state.genres);
    }

    render() {
        return (
            <SearchResultsWrapper>
                <MovieList>
                    {this.state.moviesData.map((movie, index) => (
                        <MovieItem
                            key={index}
                            movie={movie}
                            genres={this.state.genres}
                        />
                    ))}
                </MovieList>
                <FilterBarContainer>
                    <SearchBarContainer>
                        <InputWrapper>
                            <GoSearch
                                size={30}
                                style={{
                                    margin: "5px",
                                    height: "25px",
                                }}
                            />
                            <input
                                type="text"
                                name="keyword"
                                placeholder="Search by name"
                                value={this.state.keyword}
                                onChange={this.handleChange}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <GoCalendar
                                size={30}
                                style={{
                                    margin: "5px",
                                    height: "25px",
                                }}
                            />
                            <input
                                type="text"
                                name="year"
                                placeholder="Search by year"
                                onChange={this.handleChange}
                            />
                        </InputWrapper>
                    </SearchBarContainer>
                    <FilterMenuContainer>
                        <h2> Select genre(s) </h2>
                        <h4> Placerholder </h4>
                        <h4> Placerholder </h4>
                        <h4> Placerholder </h4>
                        <h4> Placerholder </h4>
                        <h4> Placerholder </h4>
                        <h4> Placerholder </h4>
                        <h2> Select min. vote </h2>
                        <h2> Select language </h2>
                    </FilterMenuContainer>
                </FilterBarContainer>
            </SearchResultsWrapper>
        );
    }
}

const SearchResultsWrapper = styled.div`
    display: flex;
`;

const MovieList = styled.div``;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 2px solid;

    input {
        border: 0;
        outline: none;
        margin: 3px;
        height: 30px;
        font-weight: 800;
        width: 100%;

        &::placeholder {
            opacity: 0.8;
            color: black;
            font-weight: 800;
        }
        &:focus::placeholder {
            color: transparent;
            transition: color 0.2s ease-out;
        }
    }
`;

const FilterBarContainer = styled.div`
    border: 2px solid black;
    border-radius: 5px;
    margin: 15px;
    width: 250px;
`;

const SearchBarContainer = styled.div`
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const FilterMenuContainer = styled.div`
    margin: 10px;
    padding: 10px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

export default SearchResults;
