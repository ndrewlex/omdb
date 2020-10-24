import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_FAVOURITE_MOVIE } from 'redux/action-types';
import { IMovieReducerState, IMovieTableRow } from 'redux/reducers/movie';
import request from './use-fetch';

export interface IGetParams {
  t?: string;
  i?: string;
}
export const useSearchMovie = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [movieList, setMovieList] = useState<IMovieTableRow[]>([]);

  const imdbIdFavId: any = useSelector((state: IMovieReducerState) =>
    state.favouriteMovieList.map((item) => item.imdbID)
  );

  const dispatch = useDispatch();

  const getMovie = async (params: IGetParams) => {
    setLoading(true);
    const response = await request({ params });
    const { payload, error } = response ?? {};
    if (payload && !error) {
      const { Error, Response, imdbID, Title, Year, isFavourite = false } =
        payload ?? {};
      // console.log({ movieData });
      if (!Error && Response === 'True') {
        //save payload as an array cause api only return object
        setMovieList([
          {
            imdbID,
            Title,
            Year,
            isFavourite: imdbIdFavId.includes(imdbID) || isFavourite,
          },
        ]);
      } else {
        setMovieList([]);
        setError(Error);
      }
    } else if (error) {
      setError(error);
    }
    setLoading(false);
  };

  const onToggleFavourite = (row: IMovieTableRow) => {
    dispatch({ type: TOGGLE_FAVOURITE_MOVIE, payload: row });
    const newMovieList = movieList.map((item) => {
      const isFavourite =
        row.imdbID === item.imdbID ? !item.isFavourite : item.isFavourite;
      return {
        ...item,
        isFavourite,
      };
    });
    setMovieList(newMovieList);
  };

  return {
    getMovie,
    onToggleFavourite,
    movieList,
    loading,
    error,
  };
};

export default useSearchMovie;
