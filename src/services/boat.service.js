import axios from "axios";

const BASE_URL = "http://localhost:5000/boat/";
class BoatService {
  getBoats() {
    return axios.get(BASE_URL);
  }

  createBoat(Boat) {
    return axios.post(BASE_URL, Boat);
  }

  getBoatById(BoatId) {
    return axios.get(BASE_URL + BoatId);
  }

  getBoatByOwner(OwnerId) {
    return axios.get(BASE_URL + "owner/" + OwnerId);
  }

  updateBoat(Boat, BoatId) {
    return axios.patch(`${BASE_URL}/${BoatId}`, Boat);
  }

  deleteBoat(BoatId) {
    return axios.delete(`${BASE_URL}/${BoatId}`);
  }
}

// export as a EmployeeService object
export default new BoatService();
