import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import styled from "styled-components";

const LanguageDropdown = ({ languages, handleChangeFilters, title }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const IconStyle = {
        margin: "5px",
        height: "25px",
    };
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
                <select
                    name="language"
                    onChange={(e) =>
                        handleChangeFilters(e.target.value, e.target.name)
                    }
                >
                    {languages.map((language, index) => (
                        <option key={index} value={language.id}>
                            {" "}
                            {language.name}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
};

export default LanguageDropdown;

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

const Icon = styled.span`
    margin: 3px;
`;
