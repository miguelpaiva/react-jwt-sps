import React from "react";
import { useHistory } from "react-router-dom";

import { Container } from "./styles";

function LinkButton({ text, icon, path }) {
  const history = useHistory();

  function goTo() {
    history.push(path);
  }

  return (
    <Container onClick={goTo}>
      {icon}
      {text}
    </Container>
  );
}

export default LinkButton;
