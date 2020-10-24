import { useState } from 'react';
import request from './use-fetch';

export interface IGetParams {
  t?: string;
  i?: string;
}

export interface IRating {
  Source?: string;
  Value?: string;
}

export interface IMovieData {
  Title?: string;
  Year?: string;
  imdbID?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: IRating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}
export const useMovieDetail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [movieData, setMovieData] = useState<IMovieData>({});

  const getMovie = async (params: IGetParams) => {
    setLoading(true);
    const response = await request({ params });
    const { payload, error } = response ?? {};
    if (payload && !error) {
      const { Error, Response, ...restData } = payload ?? {};
      // console.log({ movieData });
      if (!Error && Response === 'True') {
        setMovieData(restData);
      } else {
        setMovieData({});
        setError(Error);
      }
    } else if (error) {
      setError(error);
    }
    setLoading(false);
  };

  return {
    getMovie,
    movieData,
    loading,
    error,
  };
};

export default useMovieDetail;
