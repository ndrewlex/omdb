import { IMovieReducerState } from './reducers/movie';
import { createSelector } from 'reselect';

export const getFavouriteId = createSelector(
  (state: IMovieReducerState) => state.favouriteMovieList,
  (favouriteMovieList) => favouriteMovieList.map((item) => item.imdbID)
);
