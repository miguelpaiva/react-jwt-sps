import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container } from "./styles";

import Loading from "../../components/Loading";
import RegisterPage from "../../components/RegisterPage";

import ClientsService from "../../services/Clients.service";

function Register() {
  const companyToken = localStorage.getItem("companyToken");
  const clientsService = new ClientsService(companyToken);

  const nameRef = useRef();
  const emailRef = useRef();
  const whatsappRef = useRef();
  const sectorRef = useRef();

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(event) {
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
      setIsLoading(true);

      await clientsService.create(data);

      toast.success("Cliente cadastrado com sucesso!");

      history.push("/clients-profile");
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
        h1Text="Adicionar Cliente"
        paragText="Adicione mais um cliente na plataforma e tenha um melhor controlesobre suas informações"
      >
        <form onSubmit={handleRegister}>
          <input ref={nameRef} type="text" placeholder="Nome do Cliente" />
          <input ref={emailRef} type="email" placeholder="E-mail do Cliente" />
          <input ref={whatsappRef} type="text" placeholder="WhatsApp" />
          <input ref={sectorRef} type="text" placeholder="Setor" />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </RegisterPage>
    </Container>
  );
}

export default Register;
