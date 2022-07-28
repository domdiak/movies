import React, { useState } from "react";
import styled from "styled-components";

function GenreItem({ genre, filterResults }) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <>
            <GenreItemWrapper>
                <input
                    type="checkbox"
                    name="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                        setIsChecked(!isChecked);
                        console.log("isChecked", isChecked);
                        filterResults(genre.id);
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
