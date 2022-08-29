import axios from "axios";

const BASE_URL = "http://localhost:5000/profile/";
class ProfileService {
  getProfileById(uid) {
    return axios.get(BASE_URL + uid);
  }

  setProfile(uid, profile) {
    return axios.post(BASE_URL + uid, profile);
  }
}

export default new ProfileService();
