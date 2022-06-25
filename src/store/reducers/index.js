import { combineReducers } from "redux";
import authReducers from "./authReducers";
import labReducers from "./labReducers";

export default combineReducers({
    auth: authReducers,
    lab:labReducers
});