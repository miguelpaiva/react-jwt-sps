import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../components/Loading";
import RegisterPage from "../../components/RegisterPage";

import { Container } from "./styles";

import UsersService from "../../services/Users.service";

function RegisterUser() {
  const companyToken = localStorage.getItem("companyToken");
  const usersService = new UsersService(companyToken);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const authType = 0;

    const data = {
      name,
      email,
      password,
      authType,
    };

    try {
      setIsLoading(true);

      await usersService.create(data);

      toast.success(`Usuário cadastrado com sucesso!`);

      history.push("/");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(`Falha ao cadastrar usuário!`);
    }
  }

  return (
    <Container>
      <Loading status={isLoading} />

      <RegisterPage
        h1Text="Faça seu cadastro"
        paragText="Tenha nas mãos a melhor plataforma para cuidar das informações das suas empresas e clientes"
      >
        <form onSubmit={handleRegister}>
          <input ref={nameRef} type="text" placeholder="Nome" />
          <input ref={emailRef} type="email" placeholder="E-mail" />
          <input ref={passwordRef} type="password" placeholder="Senha" />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </RegisterPage>
    </Container>
  );
}

export default RegisterUser;
