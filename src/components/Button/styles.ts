import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ee2e5d;
  color: #fff;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  height: 56px;
  font-weight: 500;
  margin-top: 16px;
  transition: 280ms;
  &:hover {
    background: ${shade(0.2, '#EE2E5D')};
  }
`;
