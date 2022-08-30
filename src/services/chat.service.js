import axios from "axios";

const BASE_URL = "https://serene-woodland-83390.herokuapp.com/chat/";
class ChatService {
  getChatById(id) {
    return axios.post(BASE_URL, id);
  }
}

// export as a EmployeeService object
export default new ChatService();
