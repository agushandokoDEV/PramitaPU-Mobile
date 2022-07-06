import axios from "axios";
import { ADD_INSTANSI } from "../actionsType";
import { API_URL } from "@env";
import store from "..";

const SET_ADD_INSTANSI = (params) => {

    const formdata = new FormData();
    formdata.append('jenis_keg', params.jenis_keg);
    formdata.append('tujuan', params.tujuan);
    formdata.append('ket', params.ket);

    return (dispatch) => {
        dispatch({
            type: ADD_INSTANSI,
            loading:true,
            data: null,
            message: null,
            error: null
        });

        axios.post(API_URL+'/instansi',formdata, {
            headers: {
                Authorization:"Bearer "+store.getState().auth.token,
                Accept: "application/json",
            }
        }).then(function (res) {
            const {success,data,message}=res.data
            // console.log(data)
            dispatch({
                type: ADD_INSTANSI,
                loading:false,
                data: data,
                message:message,
                error: null
            });
            
        }).catch(function (error) {
            dispatch({
                type: ADD_INSTANSI,
                loading: false,
                data: null,
                message: null,
                error: error.message
            });
        });
    }
}

const SET_ADD_INSTANSI_RESET = () => {
    return (dispatch) => {
        dispatch({
            type: ADD_INSTANSI,
            loading: false,
            data: null,
            message: null,
            error: null
        });
    }
}

export {SET_ADD_INSTANSI,SET_ADD_INSTANSI_RESET}