import styled from 'styled-components';
import { Container, Col, Modal } from 'reactstrap';

export const Wrapper = styled(Container)`
  h1 {
    font-size: 1.5rem;
  }
  svg {
    font-size: 0.8rem;
  }
`;

interface FavWrapper {
  isActive?: boolean;
}

const FavWrapper = styled.div<FavWrapper>`
  svg {
    font-size: 2rem;
    fill: ${(props) => (props.isActive ? '#d7d72b' : '#ccc')};
    margin-right: 10px;
  }
`;

export const ModalStyled = styled(Modal)``;

export const RatingsGroup = styled.div`
  display: flex;
  justify-content: 'flex-end';
  align-items: "center";
  width: "100%",
  margin-bottom: 10px;
  .group-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 25px;
    &:last-of-type {
      margin-right: 0;
    }
  }
  .icon {
    margin-right: 5px;
    &:last-of-type {
      margin-right: 0;
    }
    height: 15px;
    margin: 0 0;
    img {
      height: 100%;
      width: auto;
      object-fit: contain;
    }
  }
  .value {
    margin-top: 10px;
    font-size: 0.8rem;
  }
`;

export const MovieInfo = styled.div`
  flex: 4;
  span {
    font-weight: bold;
  }
`;

export const MovieTopInfo = styled.div`
  font-size: 13px;
  margin-bottom: 10px;
`;

export const MovieImage = styled.div`
  flex: 1;
  height: 300px;
  margin: auto 0;
  margin-right: 20px;
  margin-bottom: 20px;
  img {
    height: 300px;
    width: auto;
  }
`;

export const MovieLeftInfo = styled(Col)`
  @media (max-width: 1200px) {
    max-width: 100% !important;
  }
`;
