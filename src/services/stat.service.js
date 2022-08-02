import axios from "axios";

const API_URL = "https://serene-woodland-83390.herokuapp.com";

class StatService {
  getPendingDepartureCount() {
    return axios.get(API_URL + "/query/pending/departure/count");
  }

  getPendingTriplogCount() {
    return axios.get(API_URL + "/query/pending/triplog/count");
  }

  getIfOwner(uid) {
    return axios.get(API_URL + "/query/user/" + uid);
  }
  getAllUserCount() {
    return axios.get(API_URL + "/stat/user/count");
  }

  getAllUsers() {
    return axios.get(API_URL + "/stat/user");
  }

  getCatchCount() {
    return axios.get(API_URL + "/stat/catch/count");
  }
  getAllFishermenCount() {
    return axios.get(API_URL + "/stat/fishermen/count");
  }

  getAllBoatCount() {
    return axios.get(API_URL + "/stat/boat/count");
  }

  getAllOwnerCount() {
    return axios.get(API_URL + "/stat/owner/count");
  }

  getTriplogCount() {
    return axios.get(API_URL + "/stat/triplog/count");
  }
}

export default new StatService();
