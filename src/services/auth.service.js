import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(fullname, email, phone, password) {
    return axios.post(API_URL + "signup", {
      fullname,
      email,
      phone,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  forgot_password(email) {
    return axios.post(API_URL + "forgot-password", {
      email,
    });
  }

  reset_password(password, token) {
    return axios.post(API_URL + "reset-password/" + token, {
      password,
    });
  }
}

export default new AuthService();
