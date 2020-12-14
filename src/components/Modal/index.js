import React, { useState, useImperativeHandle, forwardRef } from "react";

import { Container } from "./styles.js";

import { FiXCircle } from "react-icons/fi";

import ModalLib from "react-modal";

ModalLib.setAppElement("#modal");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Modal({ children }, ref) {
  const [isModalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  useImperativeHandle(ref, () => {
    return {
      openModal,
      closeModal,
    };
  });

  return (
    <ModalLib
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <Container>
        <FiXCircle size={70} color="#e02041" />

        {children}
      </Container>
    </ModalLib>
  );
}

export default forwardRef(Modal);
