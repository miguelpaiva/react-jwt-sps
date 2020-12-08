import "./styles.css";

import logoImg from "../../assets/sps-logo.png";

import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import UsersService from "../../services/Users.service";

function RegisterUser() {
  const companyToken = localStorage.getItem("companyToken");
  const usersService = new UsersService(companyToken);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const data = {
      name,
      email,
      password,
    };

    try {
      await usersService.create(data);

      alert(`Usuario cadastrado com sucesso!`);

      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo" />
          <h1>Faça seu cadastro</h1>
          <p>
            Tenha nas mãos uma das melhores ferramentas para gerenciar empresas
            e clientes
          </p>

          <Link className="back-link" to="/companies-profile">
            <FiArrowLeft size={20} color="#0E88FF" />
            Voltar para Login
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input ref={nameRef} type="text" placeholder="Nome" />
          <input ref={emailRef} type="email" placeholder="E-mail" />
          <input ref={passwordRef} type="password" placeholder="Senha" />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
