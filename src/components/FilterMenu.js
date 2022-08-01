import React from "react";
import styled from "styled-components";
import GenreItem from "./GenreItem";
import LanguageItem from "./LanguageItem";
import VoteItem from "./VoteItem";
import LanguageDropdown from "./LanguageDropdown";

const FilterMenu = ({ genres, languages, votes, handleChangeFilters }) => {
    return (
        <FilterMenuContainer>
            <h2> Select genre(s) </h2>
            {genres.map((genre, index) => (
                <GenreItem
                    key={index}
                    genre={genre}
                    handleChangeFilters={handleChangeFilters}
                ></GenreItem>
            ))}
            <h2> Select min. vote </h2>
            {votes.map((vote, index) => (
                <VoteItem
                    key={index}
                    vote={vote}
                    handleChangeFilters={handleChangeFilters}
                ></VoteItem>
            ))}
            <h2> Select language </h2>
            <LanguageDropdown
                languages={languages}
                handleChangeFilters={handleChangeFilters}
            />
            {/* {languages.map((language, index) => (
                <LanguageItem
                    key={index}
                    language={language}
                    handleChangeFilters={handleChangeFilters}
                >
                    {" "}
                </LanguageItem>
            ))} */}
        </FilterMenuContainer>
    );
};

export default FilterMenu;

const FilterMenuContainer = styled.div`
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;
