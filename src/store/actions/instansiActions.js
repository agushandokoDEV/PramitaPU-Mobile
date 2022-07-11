import axios from "axios";
import { ADD_INSTANSI } from "../actionsType";
import { API_URL } from "@env";
import store from "..";
import Api from "../../helpers/Api";

const SET_ADD_INSTANSI = (params) => {

    var list_keg=[]
    const formdata = new FormData();
    if(params.jenis_keg.length > 0){
        params.jenis_keg.forEach(item => {
            list_keg.push({keg:item});
        });

        console.log(list_keg)
        formdata.append('jenis_keg', JSON.stringify(list_keg));
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

            Api.post('/instansi',formdata, {
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
    }else{
        return (dispatch) => {
            dispatch({
                type: ADD_INSTANSI,
                loading: false,
                data: null,
                message: null,
                error: "Harap pilih jenis kegiatan"
            });
        }
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