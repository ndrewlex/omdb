import { IMovieData, IMovieTableRow } from 'hooks/use-fetch-movie';
import { TOGGLE_FAVOURITE_MOVIE, GET_SEARCH_MOVIE } from './action-types';
import { IGetParams } from 'hooks/use-fetch-movie';
import request from 'hooks/use-fetch';

export const toggleFavouriteMovie = (movie: IMovieTableRow) => {
  return {
    type: TOGGLE_FAVOURITE_MOVIE,
    payload: movie,
  };
};

export const getSearchMovie = async (params: IGetParams) => {
  // const { getMovie, movieList, loading } = useFetchMovie();
  console.log('loading...');
  const response = await request({ params });
  const { payload, error } = response ?? {};

  if (payload && !error) {
    //is network or fetch is success
    const { Error, Response, ...movieData } = payload ?? {};
    if (!Error && Response === 'True') {
      //if response is success
      return {
        type: GET_SEARCH_MOVIE,
        payload: [{ ...movieData }],
      };
    } else {
      //if response is error
      return {
        type: GET_SEARCH_MOVIE,
        payload: [],
      };
    }
  }

  return {
    type: GET_SEARCH_MOVIE,
    payload: [],
  };
};
