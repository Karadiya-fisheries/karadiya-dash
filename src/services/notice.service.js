import axios from "axios";

const BASE_URL = "http://localhost:5000/notice/";
class NoticeService {
  getNotices() {
    return axios.get(BASE_URL);
  }

  createNotice(notice) {
    return axios.post(BASE_URL, notice);
  }

  getNoticeById(NoticeId) {
    return axios.get(BASE_URL + NoticeId);
  }

  updateNotice(Notice, NoticeId) {
    return axios.put(`${BASE_URL}/${NoticeId}`, Notice);
  }

  deleteNotice(NoticeId) {
    return axios.delete(`${BASE_URL}/${NoticeId}`);
  }
}

// export as a EmployeeService object
export default new NoticeService();
