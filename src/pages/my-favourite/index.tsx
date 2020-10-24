import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import MovieTable from 'container/movie-table';
import { IMovieReducerState, IMovieTableRow } from 'redux/reducers/movie';
import { TOGGLE_FAVOURITE_MOVIE } from 'redux/action-types';

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

  const dispatch = useDispatch();

  const onToggleFavourite = useCallback(
    (row: IMovieTableRow) => {
      dispatch({ type: TOGGLE_FAVOURITE_MOVIE, payload: row });
    },
    [dispatch]
  );
  return (
    <Wrapper>
      <MovieTable
        movieList={favouriteList}
        onToggleFavourite={onToggleFavourite}
        loading={false}
      />
    </Wrapper>
  );
};

export default FavouritePage;
