import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";

import CompaniesProfile from "./pages/CompaniesProfile";
import RegisterCompany from "./pages/RegisterCompany";

import ClientsProfile from "./pages/ClientsProfile";
import RegisterClient from "./pages/RegisterClient";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/user/new" component={RegisterUser} />

        <Route exact path="/companies-profile" component={CompaniesProfile} />
        <Route exact path="/companies/new" component={RegisterCompany} />

        <Route exact path="/clients-profile" component={ClientsProfile} />
        <Route exact path="/clients/new" component={RegisterClient} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
