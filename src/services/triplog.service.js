import axios from "axios";

const BASE_URL = "http://localhost:5000/triplog/";
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
    return axios.put(`${BASE_URL}/${TripLogId}`, TripLog);
  }

  deleteTripLog(TripLogId) {
    return axios.delete(`${BASE_URL}/${TripLogId}`);
  }
}

// export as a EmployeeService object
export default new TripLogService();
