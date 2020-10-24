import React from 'react';
import styled from 'styled-components';
import MovieTable from 'container/movie-table';
import { IMovieData, IMovieTableRow } from 'hooks/use-fetch-movie';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    font-size: 2rem;
  }
`;

const favouriteList: IMovieTableRow[] = [
  {
    Title: 'spider',
    imdbID: 'tt0278731',
    Year: '2009',
  },
  {
    Title: 'Taken',
    imdbID: 'tt0936501',
    Year: '2010',
  },
];

const FavouritePage = () => {
  return (
    <Wrapper>
      <MovieTable movieList={favouriteList} />
    </Wrapper>
  );
};

export default FavouritePage;
