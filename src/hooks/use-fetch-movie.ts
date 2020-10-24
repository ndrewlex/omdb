import { useState } from 'react';
import request from './use-fetch';

interface IGetParams {
  t?: string;
  i?: string;
}

export interface IRating {
  Source?: string;
  Value?: string;
}

export interface IMovieData {
  Title: string;
  Year: string;
  imdbID: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

export interface IMovieTableRow {
  Title: string;
  Year: string;
  imdbID: string;
  isFavourite?: boolean;
}

export const useFetchMovie = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [movieList, setMovieList] = useState<IMovieData[]>([]);

  const getMovie = async (params: IGetParams) => {
    setLoading(true);
    const response = await request({ params });
    const { payload, error } = response ?? {};

    if (error) {
      setError(error);
    } else if (payload && !error) {
      const { Error, Response, ...movieData } = payload ?? {};
      // console.log({ movieData });
      if (!Error && Response === 'True') {
        //save payload as an array cause api only return object
        setMovieList([{ ...movieData }]);
      } else {
        setMovieList([]);
        setError(Error);
      }
    }
    setLoading(false);
  };

  console.log({ movieList });
  return {
    getMovie,
    movieList,
    loading,
    error,
  };
};

export default useFetchMovie;
