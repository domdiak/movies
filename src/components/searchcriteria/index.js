import React from "react";
import styled from "styled-components";

import FilterMenu from "../filtermenu";
import SearchBar from "../searchbar";

function SearchCriteria({
    genres,
    onSearch,
    languages,
    votes,
    handleChangeFilters,
}) {
    return (
        <>
            <SearchFilterContainer>
                <SearchBar onSearch={onSearch} />

                <FilterMenu
                    genres={genres}
                    languages={languages}
                    votes={votes}
                    handleChangeFilters={handleChangeFilters}
                />
            </SearchFilterContainer>
        </>
    );
}

const SearchFilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    margin-top: 50px;
    margin-right: 45px;
    width: 250px;
`;

export default SearchCriteria;
