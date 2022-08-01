import React from "react";
import styled from "styled-components";

function GenreItem({ genre, handleChangeFilters }) {
    return (
        <>
            <GenreItemWrapper>
                <input
                    type="checkbox"
                    name="checkbox"
                    onChange={() => {
                        handleChangeFilters(genre.id);
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
