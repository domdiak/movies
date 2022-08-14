import React from "react";
import styled from "styled-components";

import LanguageDropdown from "./LanguageDropdown";
import FilterComponent from "./FilterComponent";

const FilterMenu = ({ genres, languages, votes, handleChangeFilters }) => {
    return (
        <FilterMenuContainer>
            <FilterComponent
                handleChangeFilters={handleChangeFilters}
                options={genres}
                title={"Select genre(s)"}
                filterType={"genres"}
            />
            <FilterComponent
                handleChangeFilters={handleChangeFilters}
                options={votes}
                title={"Select min. vote"}
                filterType={"votes"}
            />

            <LanguageDropdown
                languages={languages}
                handleChangeFilters={handleChangeFilters}
                title={"Select language"}
            />
        </FilterMenuContainer>
    );
};

export default FilterMenu;

const FilterMenuContainer = styled.div`
    margin: 10px;
    margin-top: 15px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;
