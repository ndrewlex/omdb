import React, { FunctionComponent, useState } from 'react';
import Table, { ITableHeaderProps } from 'component/table';
import { AiFillStar as FavIcon } from 'react-icons/ai';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { IMovieTableRow } from 'redux/reducers/movie';
import MovieDetailModal from './movie-detail/modal';

interface FavWrapper {
  isActive?: boolean;
}
const FavWrapper = styled.div<FavWrapper>`
  svg {
    font-size: 1rem;
    fill: ${(props) => (props.isActive ? '#d7d72b' : '#ccc')};
  }
`;

const LinkStyled = styled.a`
  color: blue;
  text-decoration: 'underline';
  cursor: pointer;
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
  const [selectedImdbId, setSelectedImdbId] = useState<any>(null);

  const header: ITableHeaderProps[] = [
    {
      label: 'Title',
      Cell: (row: IMovieTableRow) => {
        return (
          <LinkStyled onClick={() => setSelectedImdbId(row.imdbID)}>
            {row.Title}
          </LinkStyled>
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
      label: 'Detail',
      Cell: (row: IMovieTableRow) => {
        return <Link to={`${location.pathname}/${row.imdbID}`}>View</Link>;
      },
    },
    {
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

  return (
    <div>
      <Table header={header} data={movieList} />
      {selectedImdbId !== null && (
        <MovieDetailModal
          imdbID={selectedImdbId}
          onClose={() => setSelectedImdbId(null)}
        />
      )}
    </div>
  );
};

export default MovieTable;
