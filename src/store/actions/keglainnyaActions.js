import axios from "axios";
import { ADD_KEG_LAINNYA } from "../actionsType";
import { API_URL } from "@env";
import store from "..";
import Api from "../../helpers/Api";

const SET_ADD_KEG_LAINNYA = (params) => {

    const formdata = new FormData();
    formdata.append('jenis_keg', params.jenis_keg);
    formdata.append('tujuan', params.tujuan);
    formdata.append('ket', params.ket);

    console.log(formdata)

    return (dispatch) => {
        dispatch({
            type: ADD_KEG_LAINNYA,
            loading:true,
            data: null,
            message: null,
            error: null
        });

        Api.post('/lainnya',formdata, {
            headers: {
                Authorization:"Bearer "+store.getState().auth.token,
                Accept: "application/json",
            }
        }).then(function (res) {
            const {success,data,message}=res.data
            // console.log(data)
            dispatch({
                type: ADD_KEG_LAINNYA,
                loading:false,
                data: data,
                message:message,
                error: null
            });
            
        }).catch(function (error) {
            dispatch({
                type: ADD_KEG_LAINNYA,
                loading: false,
                data: null,
                message: null,
                error: error.message
            });
        });
    }
}

const SET_ADD_KEG_LAINNYA_RESET = () => {
    return (dispatch) => {
        dispatch({
            type: ADD_KEG_LAINNYA,
            loading: false,
            data: null,
            message: null,
            error: null
        });
    }
}

export {SET_ADD_KEG_LAINNYA,SET_ADD_KEG_LAINNYA_RESET}