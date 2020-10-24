import React, { useEffect } from 'react';
import useFetchMovie, { IMovieData, IRating } from 'hooks/use-movie-detail';
import { useParams } from 'react-router-dom';
import imdb from 'assets/icon/imdb.svg';
import rotten from 'assets/icon/rotten-tommato.svg';
import metacritic from 'assets/icon/metacritic.svg';
import { Row, Col } from 'reactstrap';
import {
  MovieImage,
  MovieInfo,
  MovieLeftInfo,
  MovieTopInfo,
  RatingsGroup,
  Wrapper,
} from './style';

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

const MovieDetail = () => {
  const { id }: any = useParams();
  const { getMovie, movieData, error } = useFetchMovie();

  useEffect(() => {
    getMovie({ i: id });
  }, [getMovie, id]);

  const {
    Poster,
    Title,
    Year,
    Runtime,
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
        {error ? (
          <h1>Movie Not Found</h1>
        ) : (
          <Col>
            <h1>
              {Title} {Year && `(${Year})`}
            </h1>
          </Col>
        )}
      </Row>
      <Row>
        <MovieLeftInfo md={3} sm={6} xs="12">
          <MovieTopInfo>
            {Rated} | Genre: {Genre} | Duration: {Runtime} | {Released}
          </MovieTopInfo>
          <MovieImage>
            <img src={Poster} alt="N/A" />
          </MovieImage>
          <RatingsGroup>
            {Ratings.map((item: IRating) => {
              const { Source = '', Value } = item ?? {};
              return (
                <div className="group-icon">
                  <div className="icon">
                    <img src={getRatingIcon(Source)} alt="N/A"></img>
                  </div>
                  <p className="value">{Value}</p>
                </div>
              );
            })}
          </RatingsGroup>
        </MovieLeftInfo>
        <Col md={9} sm={6} xs="12">
          <MovieInfo>
            <p>
              <span>Director:</span> {Director}
            </p>
            <p>
              <span>Writer:</span> {Writer}
            </p>
            <p>
              <span>Actors:</span> {Actors}
            </p>
            <p>
              <span>Plot:</span> {Plot}
            </p>
            <p>
              <span>Awards:</span> {Awards}
            </p>
            <p>
              <span>Country:</span> {Country}
            </p>
            <p>
              <span>Box Office:</span> {BoxOffice}
            </p>
            <p>
              <span>Language:</span> {Language}
            </p>
          </MovieInfo>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MovieDetail;
