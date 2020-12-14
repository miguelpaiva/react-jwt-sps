import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";

import { Container } from "./styles";

import logoImg from "../../assets/sps-logo.png";

function Header({ buttonText, path }) {
  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <Container>
      <img src={logoImg} alt="Logo" />

      <Link className="button" to={path}>
        Cadastrar {buttonText}
      </Link>

      <button onClick={handleLogout} type="button">
        <FiPower size={20} color="#0E88FF" />
      </button>
    </Container>
  );
}

export default Header;
