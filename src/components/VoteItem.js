import React from "react";
import styled from "styled-components";

const VoteItem = ({ vote }) => {
    return (
        <>
            <VoteItemWrapper>
                <input type="checkbox" name="checkbox" />
                <label>{`More than ${vote.value}`}</label>
            </VoteItemWrapper>
        </>
    );
};

const VoteItemWrapper = styled.div`
    margin: 3px;
`;

export default VoteItem;
