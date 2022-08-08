import React from "react";
import styled from "styled-components";

const VoteItem = ({ vote, handleChangeFilters }) => {
    return (
        <>
            <VoteItemWrapper>
                <input
                    type="checkbox"
                    name="vote"
                    checked={vote.isChecked}
                    onChange={(e) => {
                        handleChangeFilters(vote.id, e.target.name);
                    }}
                />
                <label>{`More than ${vote.id}`}</label>
            </VoteItemWrapper>
        </>
    );
};

const VoteItemWrapper = styled.div`
    margin: 3px;
`;

export default VoteItem;
