import Axios from "axios";
import { API_URL } from "@env";
// import store from "../store";
// var auth = ""
// if(store.getState().auth.token){
//   auth = "Bearer "+store.getState().auth.token
// }

var host='http://192.168.0.12:8000/api';

const Api = Axios.create({
  baseURL: host,
  headers: {
    // Authorization:auth,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 20000,
});

export default Api;
