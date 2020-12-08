import "./styles.css";

import logoImg from "../../assets/sps-logo.png";

import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import CompanyService from "../../services/Company.service";

function Register() {
  const authorizationToken = localStorage.getItem("authorizationToken");
  const companyService = new CompanyService(authorizationToken);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const descriptionRef = useRef();

  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const description = descriptionRef.current.value;

    const data = {
      name,
      email,
      phone,
      description,
    };

    try {
      const response = await companyService.create(data);

      alert(`Empresa cadastrada com sucesso!`);

      history.push("/companies-profile");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo" />
          <h1>Adicionar Empresa</h1>
          <p>
            Adicione mais uma empresa na plataforma e ajude pessoas a
            encontrarem a melhor forma de gerir seus negócios
          </p>

          <Link className="back-link" to="/companies-profile">
            <FiArrowLeft size={20} color="#0E88FF" />
            Voltar para Perfil
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input ref={nameRef} type="text" placeholder="Nome da Empresa" />
          <input ref={emailRef} type="email" placeholder="E-mail" />
          <input ref={phoneRef} type="text" placeholder="Telefone" />
          <textarea ref={descriptionRef} placeholder="Descrição"></textarea>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
