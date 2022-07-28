import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GenreItem from "./GenreItem";

const FilterMenu = ({ genres, filterResults }) => {
    const [checkedState, setCheckedState] = useState(
        new Array(genres.length).fill(false)
    );

    useEffect(() => {
        console.log("checkedState", checkedState);
    });
    return (
        <FilterMenuContainer>
            <h2> Select genre(s) </h2>
            {genres.map((genre, index) => (
                <GenreItem
                    key={index}
                    genre={genre}
                    filterResults={filterResults}
                ></GenreItem>
            ))}
            <h2> Select min. vote </h2>
            <h2> Select language </h2>
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
