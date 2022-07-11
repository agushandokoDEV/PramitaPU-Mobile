import { combineReducers } from "redux";
import ambilbahanReducers from "./ambilbahanReducers";
import authReducers from "./authReducers";
import labReducers from "./labReducers";
import tabungReducers from "./tabungReducers";
import kegiatanReducers from "./kegiatanReducers";
import antarbahanReducers from "./antarbahanReducers";
import instansiReducers from "./instansiReducers";
import pengantarandokterReducers from "./pengantarandokterReducers";
import keglainnyaReducers from "./keglainnyaReducers";
import jenisuraianpekerjaanReducers from "./jenisuraianpekerjaanReducers";

export default combineReducers({
    auth: authReducers,
    lab:labReducers,
    jenisuraianpekerjaan:jenisuraianpekerjaanReducers,
    tabung:tabungReducers,
    ambilbahan:ambilbahanReducers,
    antarbahan:antarbahanReducers,
    kegiatan:kegiatanReducers,
    instansi:instansiReducers,
    pengantarandokter:pengantarandokterReducers,
    keglainnya:keglainnyaReducers
});