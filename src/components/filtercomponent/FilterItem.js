import React from "react";
import styled from "styled-components";

const FilterItem = ({ item, handleChangeFilters, filterType }) => {
    return (
        <>
            <Label htmlFor={item.name}>
                <Input
                    type="checkbox"
                    name={filterType}
                    id={item.name}
                    checked={item.isChecked}
                    onChange={(e) => {
                        handleChangeFilters(item.id, e.target.name);
                    }}
                />
                {filterType === "genres" ? (
                    <span> {item.name} </span>
                ) : (
                    <span> More than {item.name} </span>
                )}
            </Label>
        </>
    );
};

const Label = styled.label`
    display: flex;
    align-items: center;
    margin: 3px;
    cursor: pointer;
`;

const Input = styled.input`
    width: 16px;
    height: 16px;
    cursor: pointer;
`;
export default FilterItem;
