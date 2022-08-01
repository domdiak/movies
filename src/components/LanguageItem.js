import React from "react";
import styled from "styled-components";

const LanguageItem = ({ language, handleChangeFilters }) => {
    return (
        <>
            <LanguageItemWrapper>
                <option value={language.id}> </option>
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
