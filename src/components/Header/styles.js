import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 64px;
  }

  a {
    width: 260px;
    margin-left: auto;
    margin-top: 0;
  }

  button {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    border: 1px solid #dcdce6;
    background: transparent;
    margin-left: 16px;
    transition: 0.4s;
  }

  button:hover {
    border: 1px solid #999;
  }
`;
