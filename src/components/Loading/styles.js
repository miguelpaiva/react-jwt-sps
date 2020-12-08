import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    animation: svg-spin infinite 5s linear;
  }

  @keyframes svg-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
