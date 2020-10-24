import SearchBar from 'component/search-bar';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MovieTable from 'container/movie-table';
import useFetchMovie from 'hooks/use-fetch-movie';

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
  const { getMovie, movieList, loading } = useFetchMovie();
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState({});

  useEffect(() => {
    if (search) {
      getMovie(search);
    }
  }, [search]);

  const onChange = (e: any) => {
    setTitle(e.target.value);
  };
  const onSearch = () => {
    setSearch({ t: title });
  };

  return (
    <Wrapper>
      <Header>
        <SearchBar onChange={onChange} onSearch={onSearch} />
      </Header>
      <MovieTable movieList={movieList} />
    </Wrapper>
  );
};

export default SearchMoviePage;
