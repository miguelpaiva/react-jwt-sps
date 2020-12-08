import Api from "./Api.service";

class AuthService extends Api {
  async getAuthToken(email, password) {
    const response = await this.request({
      url: "auth",
      method: "POST",
      data: {
        email,
        password,
      },
    });

    return response.data;
  }

  async getCompanyToken(authorizationToken, companyId) {
    const response = await this.request({
      url: `auth/companyToken/${companyId}`,
      method: "GET",
      headers: { authorization: `Bearer ${authorizationToken}` },
    });

    return response.data;
  }
}

export default AuthService;
