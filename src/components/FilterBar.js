import React from "react";
import styled from "styled-components";
import { getMoviesByKeyword } from "../../fetcher";

class FilterBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ keyword: event.target.value });
        getMoviesByKeyword(this.state.keyword);
    }

    render() {
        return (
            <FilterBarContainer>
                <SearchBarContainer>
                    <input
                        type="text"
                        name="keyword"
                        placeholder="Search by name"
                        value={this.state.keyword}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="year"
                        placeholder="Search by year"
                    />
                </SearchBarContainer>
                <FilterMenuContainer>
                    <h2> Select genre(s) </h2>
                    <h4> Placerholder </h4>
                    <h4> Placerholder </h4>
                    <h4> Placerholder </h4>
                    <h4> Placerholder </h4>
                    <h4> Placerholder </h4>
                    <h4> Placerholder </h4>
                    <h2> Select min. vote </h2>
                    <h2> Select language </h2>
                </FilterMenuContainer>
            </FilterBarContainer>
        );
    }
}

const FilterBarContainer = styled.div`
    border: 2px solid black;
`;

const SearchBarContainer = styled.div`
    border: 2px solid black;
    display: flex;
    flex-direction: column;
`;

const FilterMenuContainer = styled.div``;

export default FilterBar;
