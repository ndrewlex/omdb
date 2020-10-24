import React, { FunctionComponent, useEffect } from 'react';
import Table, { ITableHeaderProps } from 'component/table';
import { AiOutlineStar as FavIcon } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import useFetchMovie, { IMovieTableRow } from 'hooks/use-fetch-movie';
import { useLocation } from 'react-router-dom';

interface IMovieTable {
  movieList?: any;
}
const MovieTable: FunctionComponent<IMovieTable> = ({ movieList }) => {
  const location = useLocation();

  const header: ITableHeaderProps[] = [
    {
      label: 'Title',
      Cell: (row: IMovieTableRow) => {
        return (
          <Link to={`${location.pathname}/${row.imdbID}`}>{row.Title}</Link>
        );
      },
    },
    {
      label: 'Year',
      accessor: 'Year',
    },
    {
      label: 'IMDB ID',
      accessor: 'imdbID',
    },
    {
      // accessor: 'favicon',
      Cell: () => {
        return <FavIcon />;
      },
    },
  ];

  return <Table header={header} data={movieList} />;
};

export default MovieTable;
