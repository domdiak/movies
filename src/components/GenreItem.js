import React from "react";
import styled from "styled-components";

function GenreItem({ genre }) {
    return (
        <>
            <GenreItemWrapper>
                <input type="checkbox" name="checkbox" />
                <label>{genre.name}</label>
            </GenreItemWrapper>
        </>
    );
}

const GenreItemWrapper = styled.div`
    margin: 3px;
`;

export default GenreItem;
