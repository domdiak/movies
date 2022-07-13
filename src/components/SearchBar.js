import React from "react";
import styled from "styled-components";
import { getMoviesByKeyword } from "../../fetcher";

class SearchBar extends React.Component {
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
            <div>
                <SearchBarContainer>
                    <h2> SearchBar</h2>
                    <input
                        type="text"
                        name="keyword"
                        value={this.state.keyword}
                        onChange={this.handleChange}
                    />
                    <input type="text" name="year" />
                </SearchBarContainer>
            </div>
        );
    }
}

const SearchBarContainer = styled.div`
    border: 2px solid black;
    width: 20%;
    display: flex;
    flex-direction: column;
`;

export default SearchBar;
