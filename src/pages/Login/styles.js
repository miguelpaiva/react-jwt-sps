import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 700px;
  }

  section.form {
    width: 100%;
    max-width: 350px;
    margin-right: 20px;
  }

  section.form form {
    margin-top: 100px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  section.form img {
    height: 120px;
  }

  section.form form h1 {
    font-size: 32px;
    margin-bottom: 24px;
  }
`;
