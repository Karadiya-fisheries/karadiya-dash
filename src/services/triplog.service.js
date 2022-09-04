import axios from "axios";

const BASE_URL = "https://serene-woodland-83390.herokuapp.com/triplog/";
class TripLogService {
  getTripLogs() {
    return axios.get(BASE_URL);
  }

  createTripLog(TripLog) {
    return axios.post(BASE_URL, TripLog);
  }

  getTripLogById(TripLogId) {
    return axios.get(BASE_URL + TripLogId);
  }

  updateTripLog(TripLog, TripLogId) {
    return axios.patch(`${BASE_URL}/${TripLogId}`, TripLog);
  }

  deleteTripLog(TripLogId) {
    return axios.delete(`${BASE_URL}/${TripLogId}`);
  }
}

// export as a EmployeeService object
export default new TripLogService();
