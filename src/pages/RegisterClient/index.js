import "./styles.css";

import logoImg from "../../assets/sps-logo.png";

import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import ClientsService from "../../services/Clients.service";

function Register() {
  const companyToken = localStorage.getItem("companyToken");
  const clientsService = new ClientsService(companyToken);

  const nameRef = useRef();
  const emailRef = useRef();
  const whatsappRef = useRef();
  const sectorRef = useRef();

  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const whatsapp = whatsappRef.current.value;
    const sector = sectorRef.current.value;

    const data = {
      name,
      email,
      whatsapp,
      sector,
    };

    try {
      const response = await clientsService.create(data);

      alert(`Cliente cadastrado com sucesso!`);

      history.push("/clients-profile");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo" />
          <h1>Adicionar Cliente</h1>
          <p>
            Adicione mais um cliente na plataforma e tenha um melhor controle
            sobre suas informações
          </p>

          <Link className="back-link" to="/companies-profile">
            <FiArrowLeft size={20} color="#0E88FF" />
            Voltar para Perfil
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input ref={nameRef} type="text" placeholder="Nome do Cliente" />
          <input ref={emailRef} type="email" placeholder="E-mail do Cliente" />
          <input ref={whatsappRef} type="text" placeholder="WhatsApp" />
          <input ref={sectorRef} type="text" placeholder="Setor" />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
