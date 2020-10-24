import React, { FunctionComponent } from 'react';
import Table, { ITableHeaderProps } from 'component/table';
import { AiFillStar as FavIcon } from 'react-icons/ai';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { IMovieTableRow } from 'redux/reducers/movie';

interface FavWrapper {
  isActive?: boolean;
}
const FavWrapper = styled.div<FavWrapper>`
  svg {
    font-size: 1rem;
    fill: ${(props) => (props.isActive ? '#d7d72b' : '#ccc')};
  }
`;

interface IMovieTable {
  movieList?: any;
  onToggleFavourite: any;
  loading?: boolean;
}
const MovieTable: FunctionComponent<IMovieTable> = ({
  movieList,
  onToggleFavourite,
  loading = false,
}) => {
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
