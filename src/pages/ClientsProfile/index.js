/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";

import logoImg from "../../assets/sps-logo.png";

import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import ClientsService from "../../services/Clients.service";

function Profile() {
  const history = useHistory();

  const companyToken = localStorage.getItem("companyToken");

  const clientsService = new ClientsService(companyToken);

  const [clients, setClients] = useState([]);

  async function initial() {
    try {
      const clientsList = await clientsService.list();

      setClients(clientsList);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(initial, []);

  async function handleDeleteClient(event, clientId) {
    event.stopPropagation();

    try {
      await clientsService.delete(clientId);

      setClients(clients.filter((client) => client.id !== clientId));
    } catch (error) {
      alert("Erro ao deletar Cliente!");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Logo" />
        <span>Bem vindo</span>

        <Link className="button" to="/clients/new">
          Cadastrar Novo Cliente
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={20} color="#0E88FF" />
        </button>
      </header>

      <h1>Clientes Cadastrados</h1>

      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <strong>NOME: </strong>
            <p>{client.name}</p>

            <strong>E-MAIL: </strong>
            <p>{client.email}</p>

            <strong>WHATSAPP: </strong>
            <p>{client.whatsapp}</p>

            <strong>SETOR:</strong>
            <p>{client.sector}</p>

            <button
              onClick={(e) => handleDeleteClient(e, client.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
