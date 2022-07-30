import axios from "axios";

const BASE_URL = "https://serene-woodland-83390.herokuapp.com/notice/";
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

  getCoverById(NoticeId) {
    return axios.get(BASE_URL + "cover/" + NoticeId);
  }

  setCover(NoticeId, cover) {
    return axios.post(BASE_URL + "cover/" + NoticeId, cover);
  }

  setView(NoticeId, view) {
    return axios.post(BASE_URL + "view/" + NoticeId, view);
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
