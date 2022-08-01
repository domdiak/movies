import React, { useEffect } from "react";
import styled from "styled-components";

const VoteItem = ({ vote, handleChangeFilters }) => {
    // useEffect(() => {
    //     console.log(vote);
    // });
    return (
        <>
            <VoteItemWrapper>
                <input
                    type="checkbox"
                    name="vote"
                    checked={vote.isChecked}
                    onChange={(e) => {
                        handleChangeFilters(vote.value, e.target.name);
                    }}
                />
                <label>{`More than ${vote.value}`}</label>
            </VoteItemWrapper>
        </>
    );
};

const VoteItemWrapper = styled.div`
    margin: 3px;
`;

export default VoteItem;
