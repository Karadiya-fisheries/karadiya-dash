import axios from "axios";

const BASE_URL = "https://serene-woodland-83390.herokuapp.com/departure";
class DepartureService {
  getDepartures() {
    return axios.get(BASE_URL);
  }

  createDeparture(departure) {
    return axios.post(BASE_URL, departure);
  }

  getDepartureById(departureId) {
    return axios.get(`${BASE_URL}/${departureId}`);
  }

  updateDeparture(departure, departureId) {
    return axios.put(`${BASE_URL}/${departureId}`, departure);
  }

  deleteDeparture(departureId) {
    return axios.delete(`${BASE_URL}/${departureId}`);
  }
}

// export as a EmployeeService object
export default new DepartureService();
