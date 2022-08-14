import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import styled from "styled-components";
import Select from "react-select";

const LanguageDropdown = ({ languages, handleChangeFilters, title }) => {
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
            {isExpanded && (
                <StyledSelect
                    onChange={(selectedOption) => {
                        handleChangeFilters(selectedOption.id, "languages");
                    }}
                    classNamePrefix="react-select"
                    classNameMenuList="menuList"
                    options={languages}
                    isSearchable={false}
                />
            )}
        </>
    );
};

export default LanguageDropdown;

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

const StyledSelect = styled(Select)`
    padding: 10px;
    width: 100%;

    .react-select__menu {
        width: 90%;
        margin-top: 0px;
        top: 50px;
    }
`;
