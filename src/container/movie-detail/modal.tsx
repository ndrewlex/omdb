import React, { FunctionComponent, useEffect } from 'react';
import useFetchMovie, { IMovieData, IRating } from 'hooks/use-movie-detail';
import imdb from 'assets/icon/imdb.svg';
import rotten from 'assets/icon/rotten-tommato.svg';
import metacritic from 'assets/icon/metacritic.svg';
import { Row, Col, ModalHeader, ModalBody } from 'reactstrap';
import {
  ModalStyled,
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

interface IMovieModal {
  imdbID: string;
  onClose: any;
}
const MovieModal: FunctionComponent<IMovieModal> = ({ imdbID, onClose }) => {
  const { getMovie, movieData, loading, error } = useFetchMovie();

  useEffect(() => {
    getMovie({ i: imdbID });
  }, [getMovie, imdbID]);

  const {
    Title,
    Year,
    Poster,
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
    Runtime,
  }: IMovieData = movieData;

  return (
    <ModalStyled isOpen={true} toggle={onClose} size="xl">
      <ModalHeader toggle={onClose} charCode="X">
        {error ? (
          'Movie Not Found'
        ) : (
          <div>
            {Title} {Year && `(${Year})`}
          </div>
        )}
      </ModalHeader>
      <ModalBody>
        {loading ? (
          'Please wait, loading...'
        ) : (
          <Wrapper>
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
        )}
      </ModalBody>
    </ModalStyled>
  );
};

export default MovieModal;
