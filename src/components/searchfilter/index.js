import React, { useEffect, useState } from "react";
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
    const [error, setError] = useState({
        keyword: false,
        year: false,
    });
    const [inputs, setInputs] = useState({
        keyword: "",
        year: 0,
    });

    useEffect(() => {
        validateInputs(inputs);
    }, [inputs]);

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
        onSearch({ [e.target.name]: e.target.value });
    };

    const validateInputs = (inputs) => {
        if (inputs.keyword === "" && inputs.year.length > 3) {
            setError({ ...error, keyword: true }, console.log(error));
        } else if (
            !inputs.keyword == "" &&
            inputs.year > 0 &&
            inputs.year.length < 4
        ) {
            setError({ ...error, year: true });
        } else {
            setError({
                keyword: false,
                year: false,
            });
        }
    };

    return (
        <>
            <SearchFilterContainer>
                <SearchBar handleChange={handleChange} error={error} />

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
