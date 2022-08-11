import React from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const Pagination = ({ onPageChange, totalPages }) => {
    return (
        <>
            <ReactPaginateWrapper
                breakLabel="..."
                nextLabel="next >"
                pageRangeDisplayed={3}
                pageCount={totalPages}
                onPageChange={onPageChange}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
};

export default Pagination;

const ReactPaginateWrapper = styled(ReactPaginate)`
    font-size: 25px;
`;
