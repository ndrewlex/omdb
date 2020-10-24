import React, { FunctionComponent } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
`;

const GroupAddOnStyled = styled(InputGroupAddon)`
  cursor: pointer;
`;

interface ISearchBarProps {
  onChange: any;
  onSearch: any;
}
const SearchBar: FunctionComponent<ISearchBarProps> = ({
  onChange,
  onSearch,
}) => {
  return (
    <Wrapper className="search-bar">
      <InputGroup>
        <Input placeholder="Enter movie title here.." onChange={onChange} />
        <GroupAddOnStyled addonType="append">
          <InputGroupText onClick={onSearch}>Search</InputGroupText>
        </GroupAddOnStyled>
      </InputGroup>
    </Wrapper>
  );
};

export default SearchBar;
