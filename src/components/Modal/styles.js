import styled from "styled-components";

export const Container = styled.div`
  margin: 0;
  border: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: bold;

  svg {
    margin-bottom: 24px;
  }

  button {
    padding: 16px;
    margin: 16px;
    border-radius: 4px;
    border: 1px solid #cecece;

    background-color: #fff;
  }

  button + button {
    color: #fff;
    background-color: #e02041;
  }
`;
