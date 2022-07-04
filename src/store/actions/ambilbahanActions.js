import axios from "axios";
import { AMBIL_BAHAN } from "../actionsType";
import { API_URL } from "@env";
import store from "..";

const SET_AMBIL_BAHAN = (params) => {

    const formdata = new FormData();
    formdata.append('lab_id', params.labid);
    formdata.append('nama_pasien', params.nama_pasien);
    formdata.append('yg_menyerahkan', params.yg_menyerahkan);

    if(params.tabung.length > 0){
        params.tabung.forEach(item => {
            formdata.append(`tabung[${item.id}]`, item.jumlah);
        });
    }

    return (dispatch) => {
        dispatch({
            type: AMBIL_BAHAN,
            loading:true,
            data: null,
            message: null,
            error: null
        });

        axios.post(API_URL+'/ambil-bahan',formdata, {
            headers: {
                Authorization:"Bearer "+store.getState().auth.token,
                Accept: "application/json",
            }
        }).then(function (res) {
            const {success,data,message}=res.data
            dispatch({
                type: AMBIL_BAHAN,
                loading:false,
                data: data,
                message:message,
                error: null
            });
            
        }).catch(function (error) {
            dispatch({
                type: AMBIL_BAHAN,
                loading: false,
                data: null,
                message: null,
                error: error.message
            });
        });
    }
}

const SET_AMBIL_BAHAN_RESET = () => {
    return (dispatch) => {
        dispatch({
            type: AMBIL_BAHAN,
            loading: false,
            data: null,
            message: null,
            error: null
        });
    }
}

export {SET_AMBIL_BAHAN,SET_AMBIL_BAHAN_RESET}