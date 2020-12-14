/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Loading from "../../components/Loading";
import RegisterPage from "../../components/RegisterPage";

import CompanyService from "../../services/Company.service";

import { Container } from "./styles";

function UpdateCompany({ match }) {
  const { companyId } = match.params;

  const [isLoading, setIsLoading] = useState(false);

  const authorizationToken = localStorage.getItem("authorizationToken");
  const companyService = new CompanyService(authorizationToken);

  async function getCompany() {
    try {
      const company = await companyService.get(companyId);

      nameRef.current.value = company.name;
      emailRef.current.value = company.email;
      phoneRef.current.value = company.phone;
      descriptionRef.current.value = company.description;
    } catch (error) {
      toast.error(error.message);
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
      setIsLoading(true);
      await companyService.update(companyId, data);

      toast.success("Empresa alterada com sucesso!");

      setIsLoading(false);
      history.push("/companies-profile");
    } catch (error) {
      console.error(error);
      toast.error("Falha na alteração da empresa!");
    }
  }

  return (
    <Container>
      <Loading status={isLoading} />

      <RegisterPage
        h1Text="Alterar Empresa"
        paragText="Mantenha sempre os dados da sua empresa atualizados!"
      >
        <form onSubmit={handleUpdate}>
          <input ref={nameRef} type="text" placeholder="Nome da Empresa" />
          <input ref={emailRef} type="email" placeholder="Email da empresa" />
          <input ref={phoneRef} type="text" placeholder="Telefone" />
          <textarea ref={descriptionRef} placeholder="Descrição"></textarea>

          <button className="button" type="submit">
            Alterar
          </button>
        </form>
      </RegisterPage>
    </Container>
  );
}

export default UpdateCompany;
