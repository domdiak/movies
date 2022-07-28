import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GenreItem from "./GenreItem";

const FilterMenu = ({ genres, filterResults }) => {
    const [checkedState, setCheckedState] = useState([]);

    const checkedGenres = genres.map((element) => ({
        ...element,
        checked: false,
    }));

    useEffect(() => {
        setCheckedState(checkedGenres);
    }, [genres]);

    const handleChange = (genreId, indexPosition) => {
        const updatedCheckedState = checkedState.map((item, index) => {
            if (item.id === genreId) {
                console.log(!item.checked);
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setCheckedState(updatedCheckedState);
        // filterResults(genreId);
    };

    return (
        <FilterMenuContainer>
            <h2> Select genre(s) </h2>
            {genres.map((genre, index) => (
                <GenreItem
                    key={index}
                    index={index}
                    genre={genre}
                    handleChange={handleChange}
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