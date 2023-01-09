import axios from "axios";
export default class AxiosHelper {
  /**
   * @param endPoint This will be different for every endpoint.
   */
  constructor(endPoint) {
    console.log(endPoint);
    this.endPoint = endPoint;
    axios.defaults.baseURL =
      "https://api.dev.pastorsline.com/api/contacts.json?countryId=171";
    axios.defaults.headers.common = {
      Authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs`,
    };
    axios.defaults.headers.post["Access-Control-Allow-Origin"] =
      "http://127.0.0.1:30080";
  }
  get(config) {
    console.log(config);
    return new Promise((resolve, reject) => {
      axios
        .get(this.endPoint, config)
        .then((value) => {
          resolve(value);
        })
        .catch((error) => {
          console.log("error");
          reject(error);
        });
    });
  }

  async post(requestPayload, config) {
    return new Promise((resolve, reject) => {
      axios
        .post(this.endPoint, requestPayload, config)
        .then((value) => {
          resolve(value.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async put(id, requestPayload, config) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.endPoint}`, requestPayload, config)
        .then((value) => {
          resolve(value.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async delete(id, requestPayload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.endPoint}`, { data: requestPayload })
        .then((value) => {
          resolve(value.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
