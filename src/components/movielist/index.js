import React, { useEffect } from "react";
import styled from "styled-components";
import MovieItem from "./MovieItem";
import Pagination from "./Pagination";

const MovieList = ({
    total,
    moviesData,
    isLoading,
    genres,
    getFilterIds,
    addToMovieList,
    handlePageChange,
    totalPages,
}) => {
    useEffect(() => console.log(handlePageChange));
    return (
        <>
            <MovieListWrapper>
                {total > 0 && (
                    <CountWrapper>Total results: {total}</CountWrapper>
                )}
                {!moviesData.length && !isLoading && (
                    <NoResults>
                        {" "}
                        <h1>No results have been found!</h1>{" "}
                    </NoResults>
                )}

                {moviesData
                    .filter((movie) => {
                        const selectedIds = getFilterIds(genres);

                        return selectedIds.every((item) => {
                            return movie.genre_ids.includes(item);
                        });
                    })
                    .map((movie) => (
                        <MovieItem
                            key={movie.id}
                            movie={movie}
                            genres={genres}
                            addToMovieList={addToMovieList}
                        />
                    ))}
                {moviesData.length >= 20 && (
                    <Pagination
                        onPageChange={handlePageChange}
                        totalPages={totalPages}
                    />
                )}
            </MovieListWrapper>
        </>
    );
};

export default MovieList;

const NoResults = styled.div`
    padding: 10px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
    width: 700px;
    height: 200px;
    margin: 35px;
`;

const MovieListWrapper = styled.div`
    margin-left: 45px;
    margin-right: 15px;
    margin-top: 15px;
    min-width: 700px;
`;

const CountWrapper = styled.p`
    height: 20px;
    margin-left: 15px;
`;
