import React from "react";
import styled from "styled-components";

const LanguageItem = ({ language, handleChangeFilters }) => {
    return (
        <>
            <LanguageItemWrapper>
                <input
                    type="checkbox"
                    name="language"
                    checked={language.isChecked}
                    onChange={(e) => {
                        handleChangeFilters(language.id, e.target.name);
                    }}
                />
                <label>{language.id}</label>
            </LanguageItemWrapper>
        </>
    );
};
export default LanguageItem;

const LanguageItemWrapper = styled.div`
    margin: 3px;
`;
