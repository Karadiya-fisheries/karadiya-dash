import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://serene-woodland-83390.herokuapp.com/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
  getUserDetails(fullname) {
    return axios.get(
      "https://serene-woodland-83390.herokuapp.com/fishermen/get/" + fullname,
      {
        headers: authHeader(),
      }
    );
  }
}

export default new UserService();
