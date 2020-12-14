import React from "react";

import { Container } from "./styles";

import BackButton from "../../components/BackButton";

import logoImg from "../../assets/sps-logo.png";

function RegisterPage({ h1Text, paragText, children }) {
  return (
    <Container>
      <section>
        <img src={logoImg} alt="Logo" />
        <h1>{h1Text}</h1>
        <p>{paragText}</p>

        <BackButton text="Voltar" />
      </section>
      {children}
    </Container>
  );
}

export default RegisterPage;
