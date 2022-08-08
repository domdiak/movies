import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import styled from "styled-components";
import FilterItem from "./FilterItem";

const FilterComponent = ({ handleChangeFilters, options, title, name }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleisExpanded = () => setIsExpanded(!isExpanded);

    const IconStyle = {
        margin: "5px",
        height: "25px",
    };

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
    align-items: center;
    margin: 3px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: ${(props) => props.theme.colors.blue1};
    }
`;

const FilterItemWrapper = styled.div`
    display: ${(props) => (props.isExpanded ? "block" : "none")};
`;
