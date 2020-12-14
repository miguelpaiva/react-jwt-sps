import styled from "styled-components";

export const Container = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-weight: bold;

  display: flex;
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
