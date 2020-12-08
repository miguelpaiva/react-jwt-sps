/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";

import logoImg from "../../assets/sps-logo.png";

import { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import CompanyService from "../../services/Company.service";

function UpdateCompany() {
  const authorizationToken = localStorage.getItem("authorizationToken");
  const companyService = new CompanyService(authorizationToken);

  const companyId = localStorage.getItem("companyId");

  async function getCompany() {
    try {
      const company = await companyService.get(companyId);

      nameRef.current.value = company.name;
      emailRef.current.value = company.email;
      phoneRef.current.value = company.phone;
      descriptionRef.current.value = company.description;
    } catch (error) {
      alert("erro");
    }
  }

  useEffect(getCompany, []);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const descriptionRef = useRef();

  const history = useHistory();

  async function handleUpdate(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const description = descriptionRef.current.value;

    const data = {
      name,
      email,
      phone,
      description,
    };

    try {
      const response = await companyService.update(companyId, data);

      alert(`Empresa alterada com sucesso!`);

      history.push("/companies-profile");
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
          <h1>Alterar Empresa</h1>
          <p>Mantenha sempre os dados da sua empresa atualizados!</p>

          <Link
            onClick={clearCompanyStorage}
            className="back-link"
            to="/companies-profile"
          >
            <FiArrowLeft size={20} color="#0E88FF" />
            Voltar para Perfil
          </Link>
        </section>
        <form onSubmit={handleUpdate}>
          <input ref={nameRef} type="text" placeholder="Nome da Empresa" />
          <input ref={emailRef} type="email" placeholder="Email da empresa" />
          <input ref={phoneRef} type="text" placeholder="Telefone" />
          <textarea ref={descriptionRef} placeholder="Descrição"></textarea>

          <button className="button" type="submit">
            Alterar
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCompany;
