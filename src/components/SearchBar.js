import { GoSearch, GoCalendar } from "react-icons/go";
import styled from "styled-components";
import React from "react";

const SearchBar = ({ handleChange, error }) => {
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
                        placeholder="Search by name"
                        onChange={handleChange}
                    />
                </InputWrapper>
                {error.keyword && <ErrorMessage> Required field </ErrorMessage>}

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
                {error.year && (
                    <ErrorMessage> Required full year </ErrorMessage>
                )}
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
