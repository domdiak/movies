import React from "react";
import styled from "styled-components";

function GenreItem({ genre, handleChangeFilters }) {
    return (
        <>
            <GenreItemWrapper>
                <input
                    type="checkbox"
                    name="genre"
                    checked={genre.isChecked}
                    onChange={(e) => {
                        handleChangeFilters(genre.id, e.target.name);
                    }}
                />
                <label>{genre.name}</label>
            </GenreItemWrapper>
        </>
    );
}

const GenreItemWrapper = styled.div`
    margin: 3px;
`;

export default GenreItem;
