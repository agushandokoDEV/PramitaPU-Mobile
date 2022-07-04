import axios from "axios";
import { ANTAR_BAHAN } from "../actionsType";
import { API_URL } from "@env";
import store from "..";

const SET_ANTAR_BAHAN = (params) => {

    const formdata = new FormData();
    formdata.append('lab_id', params.labid);
    formdata.append('penerima', params.penerima);

    return (dispatch) => {
        dispatch({
            type: ANTAR_BAHAN,
            loading:true,
            data: null,
            message: null,
            error: null
        });

        axios.post(API_URL+'/antar-bahan',formdata, {
            headers: {
                Authorization:"Bearer "+store.getState().auth.token,
                Accept: "application/json",
            }
        }).then(function (res) {
            const {success,data,message}=res.data
            dispatch({
                type: ANTAR_BAHAN,
                loading:false,
                data: data,
                message:message,
                error: null
            });
            
        }).catch(function (error) {
            dispatch({
                type: ANTAR_BAHAN,
                loading: false,
                data: null,
                message: null,
                error: error.message
            });
        });
    }
}

const SET_ANTAR_BAHAN_RESET = () => {
    return (dispatch) => {
        dispatch({
            type: ANTAR_BAHAN,
            loading: false,
            data: null,
            message: null,
            error: null
        });
    }
}

export {SET_ANTAR_BAHAN,SET_ANTAR_BAHAN_RESET}