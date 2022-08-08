import React from "react";
import styled from "styled-components";

import VoteItem from "./VoteItem";
import LanguageDropdown from "./LanguageDropdown";
import FilterComponent from "./FilterComponent";

const FilterMenu = ({ genres, languages, votes, handleChangeFilters }) => {
    return (
        <FilterMenuContainer>
            <FilterComponent
                handleChangeFilters={handleChangeFilters}
                options={genres}
                title={"Select genre(s)"}
                name={"genre"}
            />
            <FilterComponent
                handleChangeFilters={handleChangeFilters}
                options={votes}
                title={"Select min. vote"}
                name={"vote"}
            />

            <h2> Select language </h2>
            <LanguageDropdown
                languages={languages}
                handleChangeFilters={handleChangeFilters}
            />
        </FilterMenuContainer>
    );
};

export default FilterMenu;

const FilterMenuContainer = styled.div`
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

// const Header = styled.div`
//     display: flex;
//     flex-direction: row;
// `;

// const GenreItemWrapper = styled.div`
//     display: ${(props) => (props.isExpanded ? "block" : "none")};
// `;
