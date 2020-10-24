import SearchBar from 'component/search-bar';
import React, { useState } from 'react';
import styled from 'styled-components';
import MovieTable from 'container/movie-table';
import useSearchMovie from 'hooks/use-search-movie';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    font-size: 2rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
`;

const SearchMoviePage = () => {
  const { getMovie, movieList, loading, onToggleFavourite } = useSearchMovie();
  const [title, setTitle] = useState('');

  const onChange = (e: any) => {
    setTitle(e.target.value);
  };
  const onSearch = () => {
    getMovie({ t: title });
  };

  return (
    <Wrapper>
      <Header>
        <SearchBar onChange={onChange} onSearch={onSearch} />
      </Header>
      <MovieTable
        movieList={movieList}
        onToggleFavourite={onToggleFavourite}
        loading={loading}
      />
    </Wrapper>
  );
};

export default SearchMoviePage;
