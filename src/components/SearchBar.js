import { GoSearch, GoCalendar } from "react-icons/go";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [year, setYear] = useState({
        value: 0,
        error: "",
    });
    const [keyword, setKeyword] = useState({
        value: "",
        error: "",
    });

    useEffect(() => {
        validateInputs(year, keyword);
    }, [year.value, keyword.value]);

    const handleChange = (e) => {
        if (e.target.name === "keyword") {
            setKeyword({ ...keyword, value: e.target.value });
        } else {
            setYear({ ...year, value: e.target.value });
        }

        if (!keyword.error && !year.error) {
            onSearch(year.value, keyword.value);
        }
    };

    const validateInputs = (year, keyword) => {
        // console.log("year in validateInputs", year);
        // console.log("keyword in validateInputs", keyword);

        if (keyword.value === "" && year.value.length > 3) {
            console.log("here");
            setKeyword({ ...keyword, error: "Required field" });
        } else if (
            !keyword.value == "" &&
            year.value.length > 0 &&
            year.value.length < 4
        ) {
            setYear({ ...year, error: "Required full year" });
        } else {
            setKeyword({ ...keyword, error: "" });
            setYear({ ...year, error: "" });
        }
    };

    return (
        <>
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
                        value={keyword.value}
                        placeholder="Search by name"
                        onChange={handleChange}
                    />
                </InputWrapper>
                {keyword.error && (
                    <ErrorMessage> {keyword.error} </ErrorMessage>
                )}

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
                        value={year.value}
                        placeholder="Search by year"
                        onChange={handleChange}
                    />
                </InputWrapper>
                {year.error && <ErrorMessage> {year.error} </ErrorMessage>}
            </SearchBarContainer>
        </>
    );
};

export default SearchBar;

const SearchBarContainer = styled.div`
    margin: 0px 10px 10px 10px;
    min-height: 140px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const ErrorMessage = styled.p`
    margin: 3px;
    color: red;
`;

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
