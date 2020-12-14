/* eslint-disable react-hooks/exhaustive-deps */

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Container } from "./styles";

import RegisterPage from "../../components/RegisterPage";

import ClientsService from "../../services/Clients.service";

function UpdateClient({ match }) {
  const { clientId } = match.params;

  const companyToken = localStorage.getItem("companyToken");
  const clientsService = new ClientsService(companyToken);

  async function getClient() {
    try {
      const client = await clientsService.get(clientId);

      nameRef.current.value = client.name;
      emailRef.current.value = client.email;
      whatsappRef.current.value = client.whatsapp;
      sectorRef.current.value = client.sector;
    } catch (error) {
      toast.error(error.message);
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
      await clientsService.update(clientId, data);

      toast.success(`Cliente alterado com sucesso!`);

      history.push("/clients-profile");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <RegisterPage
        h1Text="Alterar Cliente"
        paragText="Mantenha sempre os dados de seus clientes atualizados!"
      >
        <form onSubmit={handleUpdate}>
          <input ref={nameRef} type="text" placeholder="Nome do Cliente" />
          <input ref={emailRef} type="email" placeholder="Email do Cliente" />
          <input ref={whatsappRef} type="text" placeholder="WhatsApp" />
          <input ref={sectorRef} type="text" placeholder="Setor" />

          <button className="button" type="submit">
            Alterar
          </button>
        </form>
      </RegisterPage>
    </Container>
  );
}

export default UpdateClient;
