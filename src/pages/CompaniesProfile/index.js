/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { Container, Companies } from "./styles.js";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import EmptyList from "../../components/EmptyList";
import Header from "../../components/Header";

import Company from "./components/Company";

import AuthService from "../../services/Auth.service";
import CompanyService from "../../services/Company.service";

function CompaniesProfile() {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const authorizationToken = localStorage.getItem("authorizationToken");

  const companyService = new CompanyService(authorizationToken);
  const authService = new AuthService();

  const [companies, setCompanies] = useState([]);

  const [companyId, setCompanyId] = useState("");

  //Modal
  const modalRef = useRef(null);

  function handleOpenModal(e, companyId) {
    e.stopPropagation();

    setCompanyId(companyId);

    modalRef.current.openModal();
  }

  function handleCloseModal(e) {
    e.stopPropagation();

    modalRef.current.closeModal();
  }
  //Modal

  async function render() {
    setIsLoading(true);
    const companiesList = await companyService.list();

    setCompanies(companiesList);
    setIsLoading(false);
  }
  useEffect(render, []);

  async function onSelectedCompany(company) {
    try {
      const companyToken = await authService.getCompanyToken(
        authorizationToken,
        company.id
      );

      localStorage.setItem("companyToken", companyToken);

      history.push("/clients-profile");
    } catch (error) {
      //alert("Não há clientes na lista");
    }
  }

  async function handleDeleteCompany(event, companyId) {
    event.stopPropagation();

    handleCloseModal(event);

    try {
      setIsLoading(true);
      await companyService.delete(companyId);

      setCompanies(companies.filter((company) => company.id !== companyId));

      toast.success("Empresa deletada com sucesso!");
      setIsLoading(false);
    } catch (error) {
      toast.error("Falha ao deletar a empresa!");
    }
  }

  async function handleUpdateCompany(event, company) {
    event.stopPropagation();

    history.push(`/companies/update/${company.id}`);
  }

  return (
    <Container>
      <Loading status={isLoading} />

      <Header path="/companies/new" buttonText="Empresa" />

      <h1>Empresas</h1>

      <Companies>
        {companies.length === 0 ? (
          <EmptyList>Cadastre uma empresa!</EmptyList>
        ) : (
          companies.map((company) => (
            <Company
              company={company}
              onSelected={() => onSelectedCompany(company)}
              key={company.id}
              onDelete={(e) => handleOpenModal(e, company.id)}
              onUpdate={(e) => handleUpdateCompany(e, company)}
            />
          ))
        )}
      </Companies>

      <Modal ref={modalRef}>
        <p>Você quer deletar essa empresa?</p>

        <div id="bt-group">
          <button onClick={(e) => handleCloseModal(e)}>Cancelar</button>
          <button onClick={(e) => handleDeleteCompany(e, companyId)}>
            Deletar
          </button>
        </div>
      </Modal>
    </Container>
  );
}

export default CompaniesProfile;
