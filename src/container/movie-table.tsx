import React, { FunctionComponent, useCallback } from 'react';
import Table, { ITableHeaderProps } from 'component/table';
import { AiFillStar as FavIcon } from 'react-icons/ai';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IMovieTableRow } from 'hooks/use-fetch-movie';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TOGGLE_FAVOURITE_MOVIE } from 'redux/action-types';

interface IMovieTable {
  movieList?: any;
}
interface FavWrapper {
  isActive?: boolean;
}
const FavWrapper = styled.div<FavWrapper>`
  svg {
    font-size: 1rem;
    fill: ${(props) => (props.isActive ? 'yellow' : '#ccc')};
  }
`;
const MovieTable: FunctionComponent<IMovieTable> = ({ movieList }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const onToggleFavourite = useCallback(
    (row: IMovieTableRow) => {
      dispatch({ type: TOGGLE_FAVOURITE_MOVIE, payload: row });
    },
    [dispatch]
  );

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
      Cell: (row: IMovieTableRow) => {
        const { isFavourite = false } = row;
        return (
          <FavWrapper
            isActive={isFavourite}
            onClick={() => onToggleFavourite(row)}
          >
            <FavIcon />
          </FavWrapper>
        );
      },
    },
  ];

  return <Table header={header} data={movieList} />;
};

export default MovieTable;
