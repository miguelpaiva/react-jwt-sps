import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    width: 100%;
    padding: 96px;
    background: #f0f0f5;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.15);
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content section {
    width: 100%;
    max-width: 380px;
  }

  .content img {
    height: 120px;
  }

  .content section h1 {
    margin: 64px 0 32px;
    font-size: 32px;
  }

  .content section p {
    font-size: 18px;
    line-height: 32px;
    color: #737380;
  }

  .content form {
    width: 100%;
    max-width: 450px;
  }

  .content form input {
    margin-top: 8px;
  }

  .content form .city-group {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content form .city-group input + input {
    margin-left: 8px;
  }
`;
