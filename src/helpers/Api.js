import Axios from "axios";
import { API_URL } from "@env";
// import store from "../store";
// var auth = ""
// if(store.getState().auth.token){
//   auth = "Bearer "+store.getState().auth.token
// }
// http://pramita-lab.herokuapp.com/api
var host='http://pramita-lab.herokuapp.com/api';

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
