import axios from "axios";

const BASE_URL = "http://localhost:5000/activity/";
class ActivityService {
  getActivitys() {
    return axios.get(BASE_URL);
  }

  createActivity(activity) {
    return axios.post(BASE_URL, activity);
  }

  getActivityById(uid) {
    return axios.get(BASE_URL + uid);
  }

  updateActivity(Activity, ActivityId) {
    return axios.patch(`${BASE_URL}/${ActivityId}`, Activity);
  }

  deleteActivity(ActivityId) {
    return axios.delete(`${BASE_URL}/${ActivityId}`);
  }
}

// export as a EmployeeService object
export default new ActivityService();
