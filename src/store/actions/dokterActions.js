import axios from "axios";
import { GET_LIST_DOKTER } from "../actionsType";
import { API_URL } from "@env";
import store from "..";
import Api from "../../helpers/Api";

const SET_LIST_DOKTER = () => {

    return (dispatch) => {
        dispatch({
            type: GET_LIST_DOKTER,
            loading: true,
            list: [],
            error: null
        });

        Api.get('/dokter', {
            headers: {
                Authorization:"Bearer "+store.getState().auth.token,
                Accept: "application/json",
            }
        }).then(function (res) {
            const {success,data,message}=res.data
            // console.log(res.data)
            if(success){
                dispatch({
                    type: GET_LIST_DOKTER,
                    loading: false,
                    list: data,
                    error: null
                });
            }
            
        }).catch(function (error) {
            dispatch({
                type: GET_LIST_DOKTER,
                loading: false,
                list: [],
                error: error.message
            });
        });
    }
}

export {SET_LIST_DOKTER}