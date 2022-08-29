import axios from "axios";

const BASE_URL = "http://localhost:5000/fishermen";
class FishermenService {
  getFishermens() {
    return axios.get(BASE_URL);
  }

  createTripLog(Fishermen) {
    return axios.post(BASE_URL, Fishermen);
  }

  getFishermenById(FishermenId) {
    return axios.get(BASE_URL + FishermenId);
  }

  updateFishermen(Fishermen, FishermenId) {
    return axios.put(`${BASE_URL}/${FishermenId}`, Fishermen);
  }

  deleteTripLog(FishermenId) {
    return axios.delete(`${BASE_URL}/${FishermenId}`);
  }
}

// export as a EmployeeService object
export default new FishermenService();
