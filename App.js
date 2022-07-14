import React from "react";
import SearchResults from "./src/components/SearchResults";
import SideMenu from "./src/components/SideMenu";
import styled from "styled-components";
import GlobalStyle from "./theme/globalStyles";
import Theme from "./theme/theme";

export default function App() {
    return (
        <Theme>
            <DisplayContainer>
                <GlobalStyle />
                <SideMenu />
                <SearchResults />
            </DisplayContainer>
        </Theme>
    );
}

const DisplayContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
