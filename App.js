import React from "react";
import SearchResults from "./src/pages/searchresults";
import SideMenu from "./src/components/sidemenu";
import styled from "styled-components";
import GlobalStyle from "./theme/globalStyles";
import Theme from "./theme/theme";
// import { Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <Theme>
            <DisplayContainer>
                <GlobalStyle />
                <SideMenu />
                <SearchResults />
                {/* <Routes>
                    <Route path="/" element={<SearchResults />} />
                    <Route path="/favourites" element={<SearchResults />} />
                    <Route path="/saved" element={<SearchResults />} />
                </Routes> */}
            </DisplayContainer>
        </Theme>
    );
}

const DisplayContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
