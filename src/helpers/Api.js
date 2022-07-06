import Axios from "axios";
import { API_URL } from "@env";
import store from "../store";
// var auth = ""
// if(store.getState().auth.token){
//   auth = "Bearer "+store.getState().auth.token
// }
const Api = Axios.create({
  baseURL: API_URL,
  headers: {
    // Authorization:auth,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 20000,
});

export default Api;
