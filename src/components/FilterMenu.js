import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GenreItem from "./GenreItem";
import LanguageItem from "./LanguageItem";
import VoteItem from "./VoteItem";

const FilterMenu = ({ genres, filterResults, languages, votes }) => {
    const [checkedState, setCheckedState] = useState([]);

    const checkedGenres = genres.map((element) => ({
        ...element,
        checked: false,
    }));

    useEffect(() => {
        setCheckedState(checkedGenres);
    }, [genres]);

    const sendFilters = (filterState) => {
        return filterState
            .filter((item) => item.checked)
            .map((item) => item.id);
    };

    console.log(languages);

    const handleChange = (genreId) => {
        const updatedCheckedState = checkedState.map((item, index) => {
            if (item.id === genreId) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setCheckedState(updatedCheckedState);
        filterResults(sendFilters(checkedState));
    };

    return (
        <FilterMenuContainer>
            <h2> Select genre(s) </h2>
            {genres.map((genre, index) => (
                <GenreItem
                    key={index}
                    genre={genre}
                    handleChange={handleChange}
                ></GenreItem>
            ))}
            <h2> Select min. vote </h2>
            {votes.map((vote, index) => (
                <VoteItem key={index} vote={vote}></VoteItem>
            ))}
            <h2> Select language </h2>
            {languages.map((language, index) => (
                <LanguageItem key={index} language={language}>
                    {" "}
                </LanguageItem>
            ))}
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
