import React from "react";
import styled from "styled-components";

class MovieItem extends React.Component {
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
                />
                <TextContainer>
                    <HeadingContainer>
                        <h2>
                            {this.props.movie.title}{" "}
                            {this.props.movie.release_date}{" "}
                        </h2>
                        <Rating> {this.props.movie.vote_average} </Rating>
                    </HeadingContainer>
                    <Genres>
                        {" "}
                        {this.mapGenres(
                            this.props.movie.genre_ids,
                            this.props.genres
                        ).join(" | ")}{" "}
                    </Genres>
                    <Description> {this.props.movie.overview} </Description>
                </TextContainer>
            </MovieItemContainer>
        );
    }
}

const MovieItemContainer = styled.div`
    width: 700px;
    height: 200px;
    display: flex;
    overflow: hidden;
    margin: 15px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
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

// const Heading = styled.h2`
//     background-color: ${(props) => props.theme.colors.blue1};
//     padding: 5px;
//     margin-right: 5px;
//     border-radius: 5px;
//     width: fit-content;
// `;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
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

export default MovieItem;
