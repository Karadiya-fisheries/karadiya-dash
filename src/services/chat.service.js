import axios from "axios";

const BASE_URL = "http://localhost:5000/chat/";
class ChatService {
  getChatById(id) {
    return axios.post(BASE_URL, id);
  }
}

// export as a EmployeeService object
export default new ChatService();
