import React from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

const Spinner = () => {
    return (
        <>
            <SpinnerWrapper>
                <IconWrapper>
                    <ThreeDots color="#5576d9" />
                </IconWrapper>
            </SpinnerWrapper>
        </>
    );
};

export default Spinner;

const SpinnerWrapper = styled.div`
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.8;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const IconWrapper = styled.div``;
