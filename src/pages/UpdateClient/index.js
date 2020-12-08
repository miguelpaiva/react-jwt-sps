/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";

import logoImg from "../../assets/sps-logo.png";

import { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import ClientsService from "../../services/Clients.service";

function UpdateClient() {
  const companyToken = localStorage.getItem("companyToken");
  const clientsService = new ClientsService(companyToken);

  const clientId = localStorage.getItem("clientId");

  async function getClient() {
    try {
      const client = await clientsService.get(clientId);

      nameRef.current.value = client.name;
      emailRef.current.value = client.email;
      whatsappRef.current.value = client.whatsapp;
      sectorRef.current.value = client.sector;
    } catch (error) {
      alert("erro");
    }
  }

  useEffect(getClient, []);

  const nameRef = useRef();
  const emailRef = useRef();
  const whatsappRef = useRef();
  const sectorRef = useRef();

  const history = useHistory();

  async function handleUpdate(event) {
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
      const response = await clientsService.update(clientId, data);

      alert(`Cliente alterado com sucesso!`);

      history.push("/clients-profile");
    } catch (error) {
      console.error(error);
    }
  }

  function clearCompanyStorage(event) {
    event.stopPropagation();

    localStorage.removeItem("companyId");
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo" />
          <h1>Alterar Cliente</h1>
          <p>Mantenha sempre os dados de seus clientes atualizados!</p>

          <Link
            onClick={clearCompanyStorage}
            className="back-link"
            to="/clients-profile"
          >
            <FiArrowLeft size={20} color="#0E88FF" />
            Voltar para Perfil
          </Link>
        </section>
        <form onSubmit={handleUpdate}>
          <input ref={nameRef} type="text" placeholder="Nome do Cliente" />
          <input ref={emailRef} type="email" placeholder="Email do Cliente" />
          <input ref={whatsappRef} type="text" placeholder="WhatsApp" />
          <input ref={sectorRef} type="text" placeholder="Setor" />

          <button className="button" type="submit">
            Alterar
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateClient;
