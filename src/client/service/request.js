import axios from "axios";

export default function () {
  const token = localStorage.getItem("token");
  let instance = axios;
  if (token) {
    instance = axios.create({
      headers: {
        authorization: "bearer " + token,
      }
    });
  }

  instance.interceptors.response.use(
    resp => {
      if (resp.headers.authorization) {
        localStorage.setItem("token", resp.headers.authorization);
      }
      return resp;
    },
    err => {
      if (err.response.status === 403) {
        localStorage.removeItem("token");
      }
      return Promise.reject(err);
    }
  )

  return instance;
}