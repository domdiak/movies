import { GoSearch, GoCalendar } from "react-icons/go";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [keyword, setKeyword] = useState({
        value: "",
        error: "",
    });
    const [year, setYear] = useState({
        value: "",
        error: "",
    });

    useEffect(() => {
        if (!keyword.error && !year.error) {
            onSearch(keyword.value, year.value);
        }
    }, [keyword, year]);

    const handleChangeKeyword = (e) => {
        setKeyword({
            value: e.target.value,
            error: validateInputs(e.target.value, year.value),
        });
    };

    const handleChangeYear = (e) => {
        setYear({
            value: e.target.value,
            error: validateInputs(keyword.value, e.target.value),
        });
    };

    const validateInputs = (keyword, year) => {
        if (keyword === "" && year.length > 3) {
            return "Required Field";
        } else if (!keyword == "" && year.length > 0 && year.length < 4) {
            return "Required full year";
        } else {
            return "";
        }
    };

    return (
        <>
            <SearchBarContainer>
                <InputWrapper>
                    <GoSearch size={30} style={{ IconStyle }} />
                    <input
                        type="text"
                        name="keyword"
                        // value={keyword.value}
                        placeholder="Search by name"
                        onChange={handleChangeKeyword}
                    />
                </InputWrapper>
                {keyword.error && (
                    <ErrorMessage> {keyword.error} </ErrorMessage>
                )}

                <InputWrapper>
                    <GoCalendar size={30} style={{ IconStyle }} />
                    <input
                        type="text"
                        name="year"
                        // value={year.value}
                        placeholder="Search by year"
                        onChange={handleChangeYear}
                    />
                </InputWrapper>
                {year.error && <ErrorMessage> {year.error} </ErrorMessage>}
            </SearchBarContainer>
        </>
    );
};

export default SearchBar;

const IconStyle = {
    margin: "5px",
    height: "25px",
};

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
