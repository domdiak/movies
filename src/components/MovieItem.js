import React from "react";
import styled from "styled-components";
import defaultImage from "../images/defaultImage.png";
import { CgPlayListAdd, CgPlayListCheck } from "react-icons/cg";
import { TiTick } from "react-icons/ti";

class MovieItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isWatched: false,
            isSaved: false,
        };
    }
    addToMovieList = (movie, action) => {
        this.props.addToMovieList(movie, action);
    };

    mapGenres = (genresIds, genresNames) => {
        let newArray = [];
        for (let i = 0; i < genresIds.length; i++) {
            for (let j = 0; j < genresNames.length; j++) {
                if (genresIds[i] === genresNames[j].id) {
                    newArray.push(genresNames[j].name);
                }
            }
        }

        return newArray;
    };

    render() {
        return (
            <MovieItemContainer data-testid="movieItem">
                <PosterImage
                    src={`https://image.tmdb.org/t/p/original/${this.props.movie.poster_path}`}
                    onError={(e) => {
                        e.target.src = defaultImage;
                    }}
                />
                <TextContainer>
                    <HeadingContainer>
                        <h2>{this.props.movie.title} </h2>
                        <Rating>{this.props.movie.vote_average} </Rating>
                    </HeadingContainer>
                    <Genres>
                        {" "}
                        {this.mapGenres(
                            this.props.movie.genre_ids,
                            this.props.genres
                        ).join(" | ")}{" "}
                    </Genres>
                    <Description> {this.props.movie.overview} </Description>
                    <Button
                        name="moviesWatched"
                        onClick={(e) => {
                            this.addToMovieList(
                                this.props.movie,
                                e.target.name
                            );
                            this.setState({ isWatched: !this.state.isWatched });
                        }}
                    >
                        {" "}
                        {this.state.isWatched ? (
                            <TiTick style={IconStyle} />
                        ) : (
                            <CgPlayListCheck style={IconStyle} />
                        )}
                    </Button>
                    <Button
                        name="moviesSaved"
                        onClick={(e) => {
                            this.addToMovieList(
                                this.props.movie,
                                e.target.name
                            );
                            this.setState({
                                isSaved: !this.state.isSaved,
                            });
                        }}
                    >
                        {this.state.isSaved ? (
                            <TiTick style={IconStyle} />
                        ) : (
                            <CgPlayListAdd style={IconStyle} />
                        )}
                    </Button>
                </TextContainer>
                <Overlay />
            </MovieItemContainer>
        );
    }
}

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.blue2};
    opacity: 0;

    &:hover {
        opacity: 0.5;
        transition: 0.5s ease;
    }
`;

const MovieItemContainer = styled.div`
    width: 700px;
    height: 200px;
    display: flex;
    overflow: hidden;
    margin: 15px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
    position: relative;
`;

const Rating = styled.div`
    background-color: ${(props) => props.theme.colors.blue1};
    font-size: 1.5rem;
    border-radius: 5px;
    padding: 3px;
    font-weight: 800;
    max-height: 28px;
`;

const Genres = styled.div`
    background-color: ${(props) => props.theme.colors.blue1};
    width: fit-content;
    font-size: 0.9rem;
    font-weight: 800;
    margin: 5px 0;
    padding: 3px 5px;
    border-radius: 3px;
`;

const Description = styled.p`
    overflow: hidden;
    max-height: 95px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
`;

const HeadingContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const PosterImage = styled.img`
    width: 106.6px;
    height: 160px;
    object-fit: cover;
    margin: 20px 20px;
`;

const Button = styled.button`
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

const IconStyle = {
    fontSize: "30px",
    verticalAlign: "middle",
};

export default MovieItem;
