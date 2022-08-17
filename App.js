import React from "react";
import SearchResults from "./src/pages/searchresults";
import SideMenu from "./src/components/sidemenu";
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
