import React, { useEffect } from 'react';
import useFetchMovie, { IMovieData, IRating } from 'hooks/use-movie-detail';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import imdb from 'assets/icon/imdb.svg';
import rotten from 'assets/icon/rotten-tommato.svg';
import metacritic from 'assets/icon/metacritic.svg';
import { Container, Row, Col } from 'reactstrap';

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

const Wrapper = styled(Container)`
  svg {
    font-size: 2rem;
  }
`;

const RatingsGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
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

const MovieInfo = styled.div`
  flex: 4;
`;

const MovieImage = styled.div`
  flex: 1;
  height: 300px;
  margin: auto 0;
  margin-right: 20px;
  margin-bottom: 20px;
  img {
    height: 300px;
    width: auto;
  }
`;

const MovieDetail = () => {
  const { id }: any = useParams();
  const { getMovie, movieData, loading } = useFetchMovie();
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
    BoxOffice,
    Genre,
    Country,
    Rated,
    Writer,
    Language,
  }: IMovieData = movieData;

  return (
    <Wrapper>
      <Row>
        <h1>
          {Title} {Year && `(${Year})`}
        </h1>
      </Row>
      <Row>
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
      </Row>
      <Row>
        <Col md={3} sm={6} xs="12">
          <MovieImage>
            <img src={Poster} />
          </MovieImage>
        </Col>
        <Col md={9} sm={6} xs="12">
          <MovieInfo>
            <p>Direactor: {Director}</p>
            <p>Actors: {Actors}</p>
            <p>Plot: {Plot}</p>
            <p>Released: {Released}</p>
            <p>Awards: {Awards}</p>
            <p>Genre: {Genre}</p>
            <p>Country: {Country}</p>
            <p>Box Office: {BoxOffice}</p>
          </MovieInfo>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MovieDetail;
