import axios from "axios";

const BASE_URL = "https://serene-woodland-83390.herokuapp.com/bidder/";
class BidService {
  getBidders() {
    return axios.get(BASE_URL);
  }

  createBidder(bidder, uid) {
    return axios.post(BASE_URL, bidder, uid);
  }

  getBidderById(uid) {
    return axios.get(BASE_URL + "boat/" + uid);
  }

  updateBidder(bidder, bidderId) {
    return axios.patch(`${BASE_URL}/${bidderId}`, bidder);
  }

  deleteBidder(bidderId) {
    return axios.delete(`${BASE_URL}/${bidderId}`);
  }
  getBidById(id) {
    return axios.post(BASE_URL, id);
  }
}

// export as a EmployeeService object
export default new BidService();
