import "./styles.css";

import { FiLogIn } from "react-icons/fi";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import logoImg from "../../assets/sps-logo.png";
import spsImg from "../../assets/sps-software.png";

import AuthService from "../../services/Auth.service";

export default function Login() {
  const authService = new AuthService();

  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const authorizationToken = await authService.getAuthToken(
        email,
        password
      );

      localStorage.setItem("authorizationToken", authorizationToken);

      history.push("/companies-profile");
    } catch (error) {
      alert("Falha no login");
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Logo" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu Login</h1>
          <input ref={emailRef} type="text" placeholder="Digite seu email" />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Digite sua senha"
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/user/new">
            <FiLogIn size={16} color="#0E88FF" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={spsImg} alt="SPS" />
    </div>
  );
}
