import Api from "./Api.service";

class ClientsService extends Api {
  async get(clientId) {
    const response = await this.request({
      method: "GET",
      url: `clients/${clientId}`,
    });
    return response.data;
  }
  async list() {
    const response = await this.request({
      method: "GET",
      url: "clients",
    });

    return response.data;
  }
  async create(data) {
    const response = await this.request({
      method: "POST",
      url: "clients",
      data,
    });
    return response.data;
  }
  async delete(clientId) {
    await this.request({
      method: "DELETE",
      url: `clients/${clientId}`,
    });
  }
  async update(clientId, data) {
    const response = await this.request({
      method: "PUT",
      url: `clients/${clientId}`,
      data,
    });
    return response.data;
  }
}

export default ClientsService;
