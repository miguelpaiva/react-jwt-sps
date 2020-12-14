import { useState } from "react";
import { useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login";

import { Container } from "./styles";

import { toast } from "react-toastify";

import FacebookService from "../../services/Facebook.service";
import UsersService from "../../services/Users.service";

function FacebookButton() {
  const facebookService = new FacebookService();
  const usersService = new UsersService();

  const history = useHistory();

  const loginFacebook = async () => {
    console.log("clicked");
  };

  const responseFacebook = async (response) => {
    console.log(response);

    try {
      const token = await facebookService.getOAuthToken(response.email);

      localStorage.setItem("authorizationToken", token);

      history.push("/companies-profile");
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 401) {
        const data = {
          name: response.name,
          email: response.email,
          userID: response.userID,
          accessToken: response.accessToken,
          authType: 1,
        };

        await usersService.create(data);

        const newToken = await facebookService.getOAuthToken(response.email);

        localStorage.setItem("authorizationToken", newToken);

        history.push("/companies-profile");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <Container>
      <FacebookLogin
        appId="200326931446403"
        autoLoad={false}
        fields="name,email,picture"
        scope="email,public_profile,user_friends"
        callback={responseFacebook}
        onClick={loginFacebook}
        cssClass="my-facebook-button-class"
        //icon="fa-facebook"
      />
    </Container>
  );
}

export default FacebookButton;
