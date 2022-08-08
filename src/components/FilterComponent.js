import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import styled from "styled-components";
import FilterItem from "./FilterItem";

const FilterComponent = ({ handleChangeFilters, options, title, name }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleisExpanded = () => setIsExpanded(!isExpanded);

    return (
        <>
            <Header onClick={toggleisExpanded}>
                {isExpanded ? <FiMinus /> : <GoPlus />}
                <h2> {title} </h2>
            </Header>
            <FilterItemWrapper isExpanded={isExpanded}>
                {options.map((item, index) => (
                    <FilterItem
                        key={index}
                        item={item}
                        handleChangeFilters={handleChangeFilters}
                        name={name}
                    ></FilterItem>
                ))}
            </FilterItemWrapper>
        </>
    );
};

export default FilterComponent;

const Header = styled.div`
    display: flex;
    flex-direction: row;
`;

const FilterItemWrapper = styled.div`
    display: ${(props) => (props.isExpanded ? "block" : "none")};
`;
