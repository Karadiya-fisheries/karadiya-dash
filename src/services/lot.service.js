import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://localhost:5000/lot/";
class LotService {
  getLots() {
    return axios.get(BASE_URL);
  }

  createLot(Lot) {
    return axios.post(BASE_URL, Lot, {
      headers: authHeader(),
    });
  }

  getLotWeekly() {
    return axios.get(BASE_URL + "weekly");
  }

  getLotById(LotId) {
    return axios.get(BASE_URL + LotId);
  }

  getCoverById(LotId) {
    return axios.get(BASE_URL + "cover/" + LotId);
  }

  setCover(LotId, cover) {
    return axios.post(BASE_URL + "cover/" + LotId, cover);
  }
  updateLot(Lot, LotId) {
    return axios.patch(`${BASE_URL}/${LotId}`, Lot);
  }

  deleteLot(LotId) {
    return axios.delete(`${BASE_URL}/${LotId}`);
  }
}

// export as a EmployeeService object
export default new LotService();
