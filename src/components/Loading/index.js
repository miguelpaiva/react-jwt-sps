import React from "react";
import { Container } from "./styles";

import { FiLoader } from "react-icons/fi";

function Loading({ status }) {
  if (status === false) return null;

  return (
    <Container>
      <FiLoader size={40} />
    </Container>
  );
}

export default Loading;
