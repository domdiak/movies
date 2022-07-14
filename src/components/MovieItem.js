import React from "react";
import styled from "styled-components";

class MovieItem extends React.Component {
    mapGenres = (genresIds, genresNames) => {
        let newArray = [];
        for (let i = 0; i < genresIds.length; i++) {
            for (let j = 0; j < genresNames.genres.length; j++) {
                if (genresIds[i] === genresNames.genres[j].id) {
                    newArray.push(genresNames.genres[j].name);
                }
            }
        }
        console.log({ newArray });
        return newArray;
    };

    render() {
        return (
            <MovieItemContainer>
                <PosterImage
                    src={`https://image.tmdb.org/t/p/original/${this.props.movie.poster_path}`}
                />
                <TextContainer>
                    <h2>{this.props.movie.title} </h2>
                    <p>
                        {" "}
                        {this.mapGenres(
                            this.props.movie.genre_ids,
                            this.props.genres
                        ).join(" | ")}{" "}
                    </p>
                    <p> {this.props.movie.overview} </p>
                </TextContainer>
            </MovieItemContainer>
        );
    }
}

const MovieItemContainer = styled.div`
    width: 700px;
    height: 200px;
    border: 1px solid black;
    display: flex;
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const PosterImage = styled.img`
    width: 110px;
    height: 160px;
    margin: 20px 20px;
`;

export default MovieItem;
