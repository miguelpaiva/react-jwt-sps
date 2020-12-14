import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.15);
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  section {
    width: 100%;
    max-width: 380px;
  }
  img {
    height: 120px;
  }
  section h1 {
    margin: 64px 0 32px;
    font-size: 32px;
  }
  section p {
    font-size: 18px;
    line-height: 32px;
    color: #737380;
  }
  form {
    width: 100%;
    max-width: 450px;
  }
  form input {
    margin-top: 8px;
  }
`;
