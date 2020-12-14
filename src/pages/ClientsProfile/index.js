/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container, Clients } from "./styles.js";

import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import EmptyList from "../../components/EmptyList";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";

import Client from "./components/Client";

import ClientsService from "../../services/Clients.service";

function Profile() {
  const history = useHistory();

  const companyToken = localStorage.getItem("companyToken");

  const clientsService = new ClientsService(companyToken);

  const [clients, setClients] = useState([]);

  const [clientId, setClientId] = useState("");

  //Modal
  const modalRef = useRef(null);

  function handleOpenModal(e, clientId) {
    e.stopPropagation();

    setClientId(clientId);

    modalRef.current.openModal();
  }

  function handleCloseModal(e) {
    e.stopPropagation();

    modalRef.current.closeModal();
  }
  //Modal

  async function initial() {
    try {
      const clientsList = await clientsService.list();

      setClients(clientsList);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(initial, []);

  async function handleDeleteClient(event, clientId) {
    event.stopPropagation();

    try {
      await clientsService.delete(clientId);

      setClients(clients.filter((client) => client.id !== clientId));

      handleCloseModal(event);
    } catch (error) {
      alert("Erro ao deletar Cliente!");
    }
  }

  async function handleUpdateClient(event, client) {
    event.stopPropagation();

    history.push(`/clients/update/${client.id}`);
  }

  return (
    <Container>
      <Loading status={false} />

      <Header path="/clients/new" buttonText="Cliente" />

      <h1>Clientes</h1>

      <Clients>
        {clients.length === 0 ? (
          <EmptyList>Cadastre um novo cliente!</EmptyList>
        ) : (
          clients.map((client) => (
            <Client
              key={client.id}
              client={client}
              onDelete={(e) => handleOpenModal(e, client.id)}
              onUpdate={(e) => handleUpdateClient(e, client)}
            />
          ))
        )}
      </Clients>

      <Modal ref={modalRef}>
        <p>Você quer deletar esse cliente?</p>

        <div id="bt-group">
          <button onClick={(e) => handleCloseModal(e)}>Cancelar</button>
          <button onClick={(e) => handleDeleteClient(e, clientId)}>
            Deletar
          </button>
        </div>
      </Modal>

      <BackButton text="Voltar para Perfil das Empresas" />
    </Container>
  );
}

export default Profile;
