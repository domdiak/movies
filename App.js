import React from "react";
import SearchResults from "./src/components/SearchResults";
import SideMenu from "./src/components/SideMenu";
import styled from "styled-components";
import GlobalStyle from "./theme/globalStyles";
import Theme from "./theme/theme";
import { Routes, Link, Route } from "react-router-dom";

export default function App() {
    return (
        <Theme>
            <DisplayContainer>
                <GlobalStyle />
                <SideMenu />
                <Routes>
                    <Route path="/" element={<SearchResults />} />
                    <Route path="/watched" element={<SearchResults />} />
                    <Route path="/saved" element={<SearchResults />} />
                </Routes>
            </DisplayContainer>
        </Theme>
    );
}

const DisplayContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
