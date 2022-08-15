import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import styled from "styled-components";
import FilterItem from "./FilterItem";

const FilterComponent = ({
    handleChangeFilters,
    options,
    title,
    filterType,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleisExpanded = () => setIsExpanded(!isExpanded);

    return (
        <>
            <Header onClick={toggleisExpanded}>
                {isExpanded ? (
                    <FiMinus style={IconStyle} />
                ) : (
                    <GoPlus style={IconStyle} />
                )}
                <h3> {title} </h3>
            </Header>
            <FilterItemWrapper isExpanded={isExpanded}>
                {options.map((item, index) => (
                    <FilterItem
                        key={index}
                        item={item}
                        handleChangeFilters={handleChangeFilters}
                        filterType={filterType}
                    />
                ))}
            </FilterItemWrapper>
        </>
    );
};

export default FilterComponent;

const IconStyle = {
    margin: "5px",
    height: "25px",
};

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: ${(props) => props.theme.colors.blue1};
    }
`;

const FilterItemWrapper = styled.div`
    display: ${(props) => (props.isExpanded ? "block" : "none")};
`;
