import React from "react";
import styled from "styled-components";

const FilterItem = ({ item, handleChangeFilters, name }) => {
    return (
        <>
            <GenreItemWrapper>
                <input
                    type="checkbox"
                    name={name}
                    checked={item.isChecked}
                    onChange={(e) => {
                        handleChangeFilters(item.id, e.target.name);
                    }}
                />
                {name === "genre" ? (
                    <label>{item.name}</label>
                ) : (
                    <label>{`More than ${item.id}`}</label>
                )}
            </GenreItemWrapper>
        </>
    );
};

const GenreItemWrapper = styled.div`
    margin: 3px;
`;
export default FilterItem;
