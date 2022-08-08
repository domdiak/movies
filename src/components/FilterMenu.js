import React, { useState } from "react";
import styled from "styled-components";
import GenreItem from "./GenreItem";
import VoteItem from "./VoteItem";
import LanguageDropdown from "./LanguageDropdown";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

const FilterMenu = ({ genres, languages, votes, handleChangeFilters }) => {
    const [isExpanded, setIsExpanded] = useState({
        genres: false,
        votes: false,
    });

    return (
        <FilterMenuContainer>
            <Header
                onClick={() => {
                    setIsExpanded({
                        ...isExpanded,
                        genres: !isExpanded.genres,
                    });
                }}
            >
                {isExpanded.genres ? <FiMinus /> : <GoPlus />}
                <h2> Select genre(s) </h2>
            </Header>
            <GenreItemWrapper isExpanded={isExpanded.genres}>
                {genres.map((genre, index) => (
                    <GenreItem
                        key={index}
                        genre={genre}
                        handleChangeFilters={handleChangeFilters}
                    ></GenreItem>
                ))}
            </GenreItemWrapper>
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

const Header = styled.div`
    display: flex;
    flex-direction: row;
`;

const HeaderIcon = styled.span`
    display: ${(props) => (props.isExpanded ? "block" : "none")};
`;

const GenreItemWrapper = styled.div`
    display: ${(props) => (props.isExpanded ? "block" : "none")};
`;
