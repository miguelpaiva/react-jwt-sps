import Api from "./Api.service";

class ClientsService extends Api {
  async list() {
    const response = await this.request({
      method: "GET",
      url: "user",
    });

    return response.data;
  }
  async create(data) {
    const response = await this.request({
      method: "POST",
      url: "users",
      data,
    });
    return response.data;
  }
}

export default ClientsService;
