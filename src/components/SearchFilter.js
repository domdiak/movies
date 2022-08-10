import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GoSearch, GoCalendar } from "react-icons/go";

import FilterMenu from "./FilterMenu";

function SearchFilter({
    genres,
    onChange,
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
        onChange({ [e.target.name]: e.target.value });
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
                <SearchBarContainer>
                    <InputWrapper>
                        <GoSearch
                            size={30}
                            style={{
                                margin: "5px",
                                height: "25px",
                            }}
                        />
                        <input
                            type="text"
                            name="keyword"
                            placeholder="Search by name"
                            onChange={handleChange}
                        />
                    </InputWrapper>
                    {error.keyword && <p> Required field </p>}

                    <InputWrapper>
                        <GoCalendar
                            size={30}
                            style={{
                                margin: "5px",
                                height: "25px",
                            }}
                        />
                        <input
                            type="text"
                            name="year"
                            placeholder="Search by year"
                            onChange={handleChange}
                        />
                    </InputWrapper>
                    {error.year && <p> Required full year </p>}
                </SearchBarContainer>
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

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 2px solid;

    input {
        border: 0;
        outline: none;
        margin: 3px;
        height: 30px;
        font-weight: 800;
        width: 100%;

        &::placeholder {
            opacity: 0.8;
            color: black;
            font-weight: 800;
        }
        &:focus::placeholder {
            color: transparent;
            transition: color 0.2s ease-out;
        }
    }
`;

const SearchFilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    margin: 15px;
    width: 250px;
    margin-right: 45px;
`;

const SearchBarContainer = styled.div`
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

export default SearchFilter;
