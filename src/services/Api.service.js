import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

class Api {
  constructor(token) {
    this.token = token;
  }
  async request({ headers, ...params }) {
    return await axios({
      ...params,
      baseURL,
      headers: headers || { authorization: `Bearer ${this.token}` },
    });
  }
}

//headers: { authorization: `Bearer ${authorizationToken}`

export default Api;
