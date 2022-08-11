import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import styled from "styled-components";

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
                <CustomDropdown>
                    <Select
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
                    </Select>
                </CustomDropdown>
            )}
        </>
    );
};

export default LanguageDropdown;

const Select = styled.select`
    // appearance: none;
    // outline: none;
`;

const CustomDropdown = styled.div`
    // width: 100%;
    // border: 1px solid ${(props) => props.theme.colors.blue1};
    // border-radius: 0.25em;
    // padding: 0.25em 0.5em;
    // font-size: 1.25rem;
    // cursor: pointer;
    // line-height: 1.1;
    // background-color: ${(props) => props.theme.colors.grey1};
    // background-image: ${(props) => props.theme.colors.grey1};
`;

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
