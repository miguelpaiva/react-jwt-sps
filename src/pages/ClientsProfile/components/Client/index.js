import React from "react";
import { FiTrash2, FiSettings } from "react-icons/fi";

import { Container } from "./styles";

function Client({ client, onDelete, onUpdate }) {
  return (
    <Container>
      <strong>NOME: </strong>
      <p>{client.name}</p>

      <strong>E-MAIL: </strong>
      <p>{client.email}</p>

      <strong>WHATSAPP: </strong>
      <p>{client.whatsapp}</p>

      <strong>SETOR:</strong>
      <p>{client.sector}</p>

      <button onClick={onDelete}>
        <FiTrash2 size={20} color="#a8a8b3" />
      </button>

      <button onClick={onUpdate} type="button" className="update">
        <FiSettings size={20} color="#a8a8b3" />
      </button>
    </Container>
  );
}

export default Client;
