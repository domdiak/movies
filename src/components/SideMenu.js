import React from "react";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import logoImage from "../images/Logo.png";

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    toggleisOpen = () =>
        this.setState({
            isOpen: !this.state.isOpen,
        });

    render() {
        return (
            <SideMenuWrapper>
                <Logo src={logoImage}></Logo>
                <Section>
                    <StyledLink to="/">
                        <Heading>Discover</Heading>
                    </StyledLink>
                    <GoSearch style={IconStyle} />
                </Section>
                <Section onClick={this.toggleisOpen}>
                    <Heading>Lists</Heading>
                    {this.state.isOpen ? (
                        <AiFillCaretUp style={IconStyle} />
                    ) : (
                        <AiFillCaretDown style={IconStyle} />
                    )}
                </Section>
                <ListWrapper isOpen={this.state.isOpen}>
                    <List>
                        <StyledLink to="/watched">
                            <ListItem> Watched</ListItem>
                        </StyledLink>
                        <StyledLink to="/saved">
                            <ListItem> Saved</ListItem>
                        </StyledLink>
                    </List>
                </ListWrapper>
            </SideMenuWrapper>
        );
    }
}

const ListWrapper = styled.div`
    max-height: ${(props) => (props.isOpen ? "100px" : "0px")};
    background-color: ${(props) => props.theme.colors.grey2};
    transition: max-height 0.5s ease;
    overflow: hidden;
`;

const SideMenuWrapper = styled.div`
    width: 260px;
    min-height: 100vh;
    background-color: ${(props) => props.theme.colors.grey1};
    box-shadow: 0 1px 5px rgb(0 0 0 / 0.4);
`;

const Heading = styled.h1`
    margin: 10px 5px 10px 35px;
`;

const Logo = styled.img`
    height: 50px;
    width: 170px;
    padding: 10px 35px;
`;

const List = styled.div`
    // display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const ListItem = styled.h2`
    padding: 10px 35px;
    &:hover {
        background-color: ${(props) => props.theme.colors.grey3};
        transition: background-color 0.5s ease;
    }
`;

const Section = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.grey2};
        transition: background-color 0.5s ease;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

const IconStyle = {
    margin: "5px 35px 5px 5px",
    width: "30px",
    height: "30px",
};

export default SideMenu;
