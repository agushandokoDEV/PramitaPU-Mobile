import { combineReducers } from "redux";
import ambilbahanReducers from "./ambilbahanReducers";
import authReducers from "./authReducers";
import labReducers from "./labReducers";
import tabungReducers from "./tabungReducers";
import kegiatanReducers from "./kegiatanReducers";
import antarbahanReducers from "./antarbahanReducers";

export default combineReducers({
    auth: authReducers,
    lab:labReducers,
    tabung:tabungReducers,
    ambilbahan:ambilbahanReducers,
    antarbahan:antarbahanReducers,
    kegiatan:kegiatanReducers
});