import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Loading from "../../components/Loading";
import RegisterPage from "../../components/RegisterPage";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import "./styles.css";
import { Container } from "./styles.js";

import CompanyService from "../../services/Company.service";

function Register() {
  const authorizationToken = localStorage.getItem("authorizationToken");
  const companyService = new CompanyService(authorizationToken);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const descriptionRef = useRef();

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const description = descriptionRef.current.value;

    const companyData = {
      name,
      email,
      phone,
      description,
    };

    try {
      setIsLoading(true);

      await companyService.create(companyData);

      toast.success("Empresa cadastrada com sucesso!");

      history.push("/companies-profile");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading status={isLoading} />

      <RegisterPage
        h1Text="Cadastrar Empresa"
        paragText="Tenha sempre o controle das suas empresas com o melhor sistema!"
      >
        <form onSubmit={handleRegister}>
          <input ref={nameRef} type="text" placeholder="Nome da Empresa" />
          <input ref={emailRef} type="email" placeholder="E-mail" />
          <input ref={phoneRef} type="text" placeholder="Telefone" />
          <textarea ref={descriptionRef} placeholder="Descrição"></textarea>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </RegisterPage>
    </Container>
  );
}

export default Register;
