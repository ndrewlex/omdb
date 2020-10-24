import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { IRouter } from 'utils/router';

const Wrapper = styled.div`
  display: flex;
`;

const Item = styled(NavLink)`
  text-decoration: none !important;
  padding: 10px 15px;
  background-color: white;
  color: black;
  &.selected {
    background-color: #ccc;
  }
  &:hover {
    color: black;
  }
  @media (max-width: 768px) {
    padding: 8px 13px;
  }
`;

interface ITabHeaderProps {
  router: IRouter[];
}
const TabHeader: FunctionComponent<ITabHeaderProps> = ({ router = [] }) => {
  return (
    <Wrapper>
      {router.map((item, index) => {
        const { path, title } = item;
        return (
          <Item key={index} to={path} activeClassName="selected">
            {title}
          </Item>
        );
      })}
    </Wrapper>
  );
};

export default TabHeader;
