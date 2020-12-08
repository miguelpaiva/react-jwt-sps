/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";

import logoImg from "../../assets/sps-logo.png";

import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2, FiSettings } from "react-icons/fi";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../components/Loading";

import AuthService from "../../services/Auth.service";
import CompanyService from "../../services/Company.service";

function CompaniesProfile() {
  const history = useHistory();

  const authorizationToken = localStorage.getItem("authorizationToken");

  const companyService = new CompanyService(authorizationToken);
  const authService = new AuthService();

  const [companies, setCompanies] = useState([]);

  const loginToast = () => toast.success("Login realizado com sucesso!");

  async function render() {
    loginToast();
    const companiesList = await companyService.list();

    setCompanies(companiesList);
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

    try {
      await companyService.delete(companyId);

      setCompanies(companies.filter((company) => company.id !== companyId));
    } catch (error) {
      alert("Erro ao deletar Empresa!");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  async function handleUpdateCompany(event, company) {
    event.stopPropagation();
    localStorage.setItem("companyId", company.id);
  }

  return (
    <div className="profile-container">
      <Loading status={false} />
      <header>
        <img src={logoImg} alt="Logo" />
        <span>Bem vindo </span>

        <Link className="button" to="/companies/new">
          Cadastrar Empresa
        </Link>

        <button onClick={handleLogout} type="button">
          <FiPower size={20} color="#0E88FF" />
        </button>
      </header>

      <h1>Empresas</h1>

      <ul>
        {companies.length === 0 ? (
          <div>Cadastre um cliente!</div>
        ) : (
          companies.map((company) => (
            <li onClick={() => onSelectedCompany(company)} key={company.id}>
              <strong>NOME: </strong>
              <p>{company.name}</p>

              <strong>E-MAIL: </strong>
              <p>{company.email}</p>

              <strong>DESCRIÇÃO: </strong>
              <p>{company.description}</p>

              <strong>TELEFONE:</strong>
              <p>{company.phone}</p>

              <button
                onClick={(e) => handleDeleteCompany(e, company.id)}
                type="button"
              >
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>

              <Link to="/companies/update">
                <button
                  onClick={(e) => handleUpdateCompany(e, company)}
                  type="button"
                  className="update"
                >
                  <FiSettings size={20} color="#a8a8b3" />
                </button>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CompaniesProfile;
