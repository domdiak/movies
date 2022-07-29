import React from "react";
import styled from "styled-components";

const LanguageItem = ({ language }) => {
    return (
        <>
            <LanguageItemWrapper>
                <input type="checkbox" name="checkbox" />
                <label>{language.name}</label>
            </LanguageItemWrapper>
        </>
    );
};
export default LanguageItem;

const LanguageItemWrapper = styled.div`
    margin: 3px;
`;
