import Api from "./Api.service";

class CompanyService extends Api {
  async list() {
    const response = await this.request({
      method: "GET",
      url: "companies",
    });

    return response.data;
  }
  async create(data) {
    const response = await this.request({
      method: "POST",
      url: "companies",
      data,
    });

    return response.data;
  }
  async delete(companyId) {
    await this.request({
      method: "DELETE",
      url: `companies/${companyId}`,
    });
  }
  async update(companyId) {
    const response = await this.request({
      method: "PUT",
      url: `companies/${companyId}`,
    });
    return response.data;
  }
}

export default CompanyService;
