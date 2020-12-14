import React from "react";
import { useHistory } from "react-router-dom";

import { Container } from "./styles";
import { FiArrowLeft } from "react-icons/fi";

function BackButton({ text, icon }) {
  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <Container onClick={goBack}>
      {icon ? icon : <FiArrowLeft size={20} color="#0E88FF" />}
      {text}
    </Container>
  );
}

export default BackButton;
