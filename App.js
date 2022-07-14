import React from "react";
import SearchResults from "./src/components/SearchResults";
import SideMenu from "./src/components/SideMenu";
import styled from "styled-components";
import GlobalStyle from "./theme/globalStyles";

export default function App() {
    return (
        <DisplayContainer>
            <GlobalStyle />
            <SideMenu />
            <SearchResults />
        </DisplayContainer>
    );
}

const DisplayContainer = styled.div`
    display: flex;
`;
