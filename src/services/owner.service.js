import axios from "axios";

const BASE_URL = "https://serene-woodland-83390.herokuapp.com/owner/";
class OwnerService {
  getOwners() {
    return axios.get(BASE_URL);
  }

  createOwner(owner) {
    return axios.post(BASE_URL, owner);
  }

  getOwnerById(OwnerId) {
    return axios.get(BASE_URL + OwnerId);
  }

  updateOwner(Owner, OwnerId) {
    return axios.put(`${BASE_URL}/${OwnerId}`, Owner);
  }

  deleteOwner(OwnerId) {
    return axios.delete(`${BASE_URL}/${OwnerId}`);
  }
}

// export as a EmployeeService object
export default new OwnerService();
