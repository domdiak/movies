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
                activeClassName="active"
                breakClassName="break-me"
                pageClassName="page"
                previousClassName="previous"
                nextClassName="next"
            />
        </>
    );
};

export default Pagination;

const ReactPaginateWrapper = styled(ReactPaginate)`
    padding-left: 0px;
    font-size: 25px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .active {
        border: 2px solid black;
        align-items: center;
        background-color: ${(props) => props.theme.colors.blue1};
        cursor: none;
    }

    .break-me {
        list-style: none;
        cursor: pointer;
        min-width: 40px;
        min-height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: ${(props) => props.theme.colors.blue1};
        }
    }

    .page {
        list-style: none;
        cursor: pointer;
        min-width: 40px;
        min-height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: ${(props) => props.theme.colors.blue1};
            transition: background-color 0.5s ease;
        }
    }

    .previous {
        list-style: none;
        cursor: pointer;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: ${(props) => props.theme.colors.blue1};
            transition: background-color 0.5s ease;
        }
    }

    .next {
        list-style: none;
        cursor: pointer;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: ${(props) => props.theme.colors.blue1};
            transition: background-color 0.5s ease;
        }
    }
`;
