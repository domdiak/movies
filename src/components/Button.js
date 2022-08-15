import React, { useState } from "react";
import styled from "styled-components";

const Button = ({ name, addToMovieList, label }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <ButtonWrapper
            name="moviesWatched"
            onClick={(e) => {
                addToMovieList(movie, e.target.name);
                setIsActive(!isActive);
            }}
        >
            {" "}
            {isActive ? (
                <TiTick style={IconStyle} />
            ) : (
                <CgPlayListCheck style={IconStyle} />
            )}
            Watch Later
        </ButtonWrapper>
    );
};

export default Button;

const ButtonWrapper = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 70px;
    height: 30px;
    border-radius: 5px;
    opacity: 0;
    background-color: ${(props) => props.theme.colors.blue2};
    transition: opacity 0.35s ease;
    z-index: 5;
    border: 2px solid black;
    box-shadow: 3px 3px gray;

    &:nth-of-type(2n) {
        bottom: 10px;
        right: 90px;
    }

    &:hover {
        background-color: ${(props) => props.theme.colors.blue2};
        opacity: 0.5;
        transform: translate(-2px, -2px);
    }

    &:active {
        transform: translate(1px, 1px);
        transition: transform 0.2s ease;
    }

    ${MovieItemContainer}:hover & {
        opacity: 1;
    }
`;
