import Api from "./Api.service";

class UsersService extends Api {
  async list() {
    const response = await this.request({
      method: "GET",
      url: "users",
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

export default UsersService;
