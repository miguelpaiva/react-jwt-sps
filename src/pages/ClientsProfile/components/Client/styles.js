import styled from "styled-components";

export const Container = styled.div`
  min-width: 420px;
  margin: 16px;

  background: #fff;
  padding: 24px;
  border-radius: 8px;
  position: relative;

  button {
    position: absolute;
    right: 24px;
    top: 24px;
    background: none;
    border: 0;
    transition: 0.4s;
  }

  button:hover {
    opacity: 0.8;
  }

  button.update {
    position: absolute;
    right: 58px;
    top: 24px;
    background: none;
    border: 0;
    transition: 0.4s;
  }

  button.update:hover {
    opacity: 0.8;
  }

  strong {
    display: block;
    margin-bottom: 10px;
    color: #41414d;
  }

  p + strong {
    margin-top: 32px;
  }

  p {
    color: #737380;
    line-height: 20px;
    font-size: 16px;
  }
`;
