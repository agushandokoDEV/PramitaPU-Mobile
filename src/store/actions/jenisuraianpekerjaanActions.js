import axios from "axios";
import { GET_LIST_JENIS_URAIAN_PEKERJAAN } from "../actionsType";
import { API_URL } from "@env";
import store from "..";
import Api from "../../helpers/Api";

const SET_LIST_JENIS_URAIAN_PEKERJAAN = () => {

    return (dispatch) => {
        dispatch({
            type: GET_LIST_JENIS_URAIAN_PEKERJAAN,
            loading: true,
            list: [],
            error: null
        });

        Api.get('/jenis-uraian-pekerjaan', {
            headers: {
                Authorization:"Bearer "+store.getState().auth.token,
                Accept: "application/json",
            }
        }).then(function (res) {
            const {success,data,message}=res.data
            
            var list =[];
            if(data.length > 0){
                data.forEach(item => {
                    list.push({
                        name:item.nama,
                        id:item.id
                    })
                });
            }
            // console.log(list)
            if(success){
                dispatch({
                    type: GET_LIST_JENIS_URAIAN_PEKERJAAN,
                    loading: false,
                    list: list,
                    error: null
                });
            }
            
        }).catch(function (error) {
            dispatch({
                type: GET_LIST_JENIS_URAIAN_PEKERJAAN,
                loading: false,
                list: [],
                error: error.message
            });
        });
    }
}

export {SET_LIST_JENIS_URAIAN_PEKERJAAN}