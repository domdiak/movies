import React from "react";
import styled from "styled-components";
import { GoSearch, GoCalendar } from "react-icons/go";
import GenreItem from "./GenreItem";

function SearchFilter() {
    return (
        <>
            <SearchFilterContainer>
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
                    {this.state.error.keyword && <p> Required field </p>}
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
                    {this.state.error.year && <p> Required full year </p>}
                </SearchBarContainer>
                <FilterMenuContainer>
                    <h2> Select genre(s) </h2>
                    {this.state.genres.map((genre, index) => (
                        <GenreItem key={index} genre={genre}></GenreItem>
                    ))}
                    <h2> Select min. vote </h2>
                    <h2> Select language </h2>
                </FilterMenuContainer>
            </SearchFilterContainer>
        </>
    );
}

export default SearchFilter;

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

const SearchFilterContainer = styled.div`
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
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;