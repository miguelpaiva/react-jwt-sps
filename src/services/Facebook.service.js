import Api from "./Api.service";

class FacebookService extends Api {
  async getOAuthToken(email) {
    const response = await this.request({
      url: "auth/facebook",
      method: "POST",
      data: {
        email,
      },
    });

    return response.data;
  }
}

export default FacebookService;
