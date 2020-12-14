import React from "react";
import { FiTrash2, FiSettings } from "react-icons/fi";

import { Container } from "./styles";

function Company({ company, onDelete, onSelected, onUpdate }) {
  return (
    <Container onClick={onSelected}>
      <strong>NOME: </strong>
      <p>{company.name}</p>

      <strong>E-MAIL: </strong>
      <p>{company.email}</p>

      <strong>DESCRIÇÃO: </strong>
      <p>{company.description}</p>

      <strong>TELEFONE:</strong>
      <p>{company.phone}</p>

      <button onClick={onDelete}>
        <FiTrash2 size={20} color="#a8a8b3" />
      </button>

      <button onClick={onUpdate} type="button" className="update">
        <FiSettings size={20} color="#a8a8b3" />
      </button>
    </Container>
  );
}

export default Company;
