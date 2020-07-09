import axios from "axios";

export default class Restaurant {
  constructor(restId) {
    this.id = restId;
  }

  getMenu() {
    return axios.get(`/restaurant/menu/${this.id}`);
  }

  getQR() {
    return axios.get(`/restaurant/qr/${this.id}`);
  }
}
