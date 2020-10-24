import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MovieTable from 'container/movie-table';
import { IMovieReducerState } from 'redux/reducers/movie';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    font-size: 2rem;
  }
`;

const FavouritePage = () => {
  const favouriteList = useSelector(
    (state: IMovieReducerState) => state.favouriteMovieList
  );
  return (
    <Wrapper>
      <MovieTable movieList={favouriteList} />
    </Wrapper>
  );
};

export default FavouritePage;
