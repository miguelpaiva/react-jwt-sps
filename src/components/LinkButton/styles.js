import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  color: #41414d;
  font-size: 18px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.2s;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  svg {
    margin-right: 10px;
  }
`;
