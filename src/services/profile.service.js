import axios from "axios";

const BASE_URL = "https://serene-woodland-83390.herokuapp.com/profile/";
class ProfileService {
  getProfileById(uid) {
    return axios.get(BASE_URL + uid);
  }

  setProfile(uid, profile) {
    return axios.post(BASE_URL + uid, profile);
  }
}

export default new ProfileService();
