import React from "react";
import styled from "styled-components";

class SideMenu extends React.Component {
    render() {
        return (
            <SideMenuWrapper>
                <h1> Side Menu</h1>
                <h1> Discover</h1>
                <h1> Watched</h1>
                <h2> Movies</h2>
                <h2> TV Shows</h2>
                <h1> Saved</h1>
                <h2> Movies</h2>
                <h2> TV Shows</h2>
            </SideMenuWrapper>
        );
    }
}

const SideMenuWrapper = styled.div`
    border: 2px solid black;
    width: 260px;
`;

export default SideMenu;
