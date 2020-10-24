import React, { useEffect, useMemo } from 'react';
import useFetchMovie, { IMovieData, IRating } from 'hooks/use-fetch-movie';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import imdb from 'assets/icon/imdb.svg';
import rotten from 'assets/icon/rotten-tommato.svg';
import metacritic from 'assets/icon/metacritic.svg';

const getRatingIcon = (source: string) => {
  switch (source) {
    case 'Internet Movie Database':
      return imdb;
    case 'Rotten Tomatoes':
      return rotten;
    case 'Metacritic':
      return metacritic;
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    font-size: 2rem;
  }
`;

const RatingsGroup = styled.div`
  display: flex;

  .group-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    &:last-of-type {
      margin-right: 0;
    }
  }
  .icon {
    margin-right: 5px;
    &:last-of-type {
      margin-right: 0;
    }
    height: 20px;
    margin: 0 0;
    img {
      height: 100%;
      width: auto;
      object-fit: contain;
    }
  }

  .value {
    margin-top: 10px;
    font-size: 0.85rem;
  }
`;

const MovieContent = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const MovieInfo = styled.div`
  flex: 4;
`;

const MovieImage = styled.div`
  flex: 1;
  height: 300px;
  margin: auto 0;
  img {
    height: 300px;
    width: auto;
  }
`;

const MovieDetail = () => {
  const { id }: any = useParams();
  const { getMovie, movieList, loading } = useFetchMovie();
  useEffect(() => {
    getMovie({ i: id });
  }, []);

  const {
    Poster,
    Title,
    Year,
    Released,
    Director,
    Actors,
    Plot,
    Awards,
    Ratings = [],
  }: IMovieData = useMemo(() => movieList?.[0] ?? {}, [movieList]);

  return (
    <Wrapper>
      <h1>
        {Title} ({Year})
      </h1>
      <RatingsGroup>
        {Ratings.map((item: IRating) => {
          const { Source = '', Value } = item ?? {};
          return (
            <div className="group-icon">
              <div className="icon">
                <img src={getRatingIcon(Source)}></img>
              </div>
              <p className="value">{Value}</p>
            </div>
          );
        })}
      </RatingsGroup>
      <MovieContent>
        <MovieImage>
          <img src={Poster} />
        </MovieImage>
        <MovieInfo>
          <p>Direactor: {Director}</p>
          <p>Actors: {Actors}</p>
        </MovieInfo>
      </MovieContent>
    </Wrapper>
  );
};

export default MovieDetail;
