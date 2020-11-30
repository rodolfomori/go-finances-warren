import styled from 'styled-components';
import { FiLogOut } from 'react-icons/fi';

export const Container = styled.div`
  background: black;
  padding: 30px 0;

  img {
    max-width: 70px;
  }

  header {
    margin: 0 auto;
    padding: 0 20px 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display: flex;
      align-items: center;
      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          opacity: 0.6;
        }
      }
      button {
        color: #fff;
        border: none;
        background-color: transparent;
        font-size: 16px;
        transition: opacity 0.2s;
        margin: 0 16px;
        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`;

export const LogOutIcon = styled(FiLogOut)`
  margin-left: 20px;
  color: #fff;
  width: 28px;
  height: 20px;
  transition: 200ms;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
