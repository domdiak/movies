import React, { useEffect, useState } from "react";
import styled from "styled-components";

function GenreItem({ genre, handleChange, index }) {
    return (
        <>
            <GenreItemWrapper>
                <input
                    type="checkbox"
                    name="checkbox"
                    onChange={(e) => {
                        handleChange(genre.id, index);
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
