import React from "react";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import logoImage from "../images/Logo.jpg";

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
        };
    }

    toggleisExpanded = () =>
        this.setState({
            isExpanded: !this.state.isExpanded,
        });

    render() {
        return (
            <SideMenuWrapper>
                <Logo src={logoImage}></Logo>
                <Section>
                    <Heading>Discover</Heading>
                    <GoSearch style={IconStyle} />
                </Section>
                <Section onClick={this.toggleisExpanded}>
                    <Heading>Lists</Heading>
                    {this.state.isExpanded ? (
                        <AiFillCaretUp style={IconStyle} />
                    ) : (
                        <AiFillCaretDown style={IconStyle} />
                    )}
                </Section>
                <List isExpanded={this.state.isExpanded}>
                    <Link to="/watched">
                        <ListItem> Watched</ListItem>
                    </Link>
                    <ListItem> Saved</ListItem>
                </List>
            </SideMenuWrapper>
        );
    }
}

const SideMenuWrapper = styled.div`
    width: 260px;
    background-color: ${(props) => props.theme.colors.grey1};
`;

const Heading = styled.h1`
    margin: 10px 5px 10px 35px;
`;

const Logo = styled.img`
    width: 260px;
`;

const List = styled.div`
    display: ${(props) => (props.isExpanded ? "block" : "none")};
`;

const ListItem = styled.h2`
    padding: 10px 35px;
    &:hover {
        background-color: ${(props) => props.theme.colors.blue2};
    }
`;

const Section = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: ${(props) => props.theme.colors.blue2};
    }
`;

const IconStyle = {
    margin: "5px 35px 5px 5px",
    width: "30px",
    height: "30px",
};

export default SideMenu;
