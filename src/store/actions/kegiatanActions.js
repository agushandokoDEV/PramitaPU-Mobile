import axios from "axios";
import { GET_LIST_KEGIATAN,GET_DETAIL_KEGIATAN,GET_RIWAYAT_KEGIATAN } from "../actionsType";
import { API_URL } from "@env";
import store from "..";
import Api from "../../helpers/Api";

const SET_LIST_KEGIATAN = () => {

    return (dispatch) => {
        dispatch({
            type: GET_LIST_KEGIATAN,
            loading: true,
            list: [],
            error: null
        });

        Api.get('/kegiatan', {
            headers: {
                Authorization:"Bearer "+store.getState().auth.token,
                Accept: "application/json",
            }
        }).then(function (res) {
            const {success,data,message}=res.data
            
            if(success){
                dispatch({
                    type: GET_LIST_KEGIATAN,
                    loading: false,
                    list: data,
                    error: null
                });
            }
            
        }).catch(function (error) {
            dispatch({
                type: GET_LIST_KEGIATAN,
                loading: false,
                list: [],
                error: error.message
            });
        });
    }
}

const SET_DETAIL_KEGIATAN = (id) => {

    return (dispatch) => {
        dispatch({
            type: GET_DETAIL_KEGIATAN,
            loading: true,
            data: null,
            error: null
        });

        Api.get(`/kegiatan/${id}`, {
            headers: {
                Authorization:"Bearer "+store.getState().auth.token,
                Accept: "application/json",
            }
        }).then(function (res) {
            const {success,data,message}=res.data
            
            if(success){
                dispatch({
                    type: GET_DETAIL_KEGIATAN,
                    loading: false,
                    data: data,
                    error: null
                });
            }
            
        }).catch(function (error) {
            dispatch({
                type: GET_DETAIL_KEGIATAN,
                loading: false,
                data: null,
                error: error.message
            });
        });
    }
}

const SET_RIWAYAT_KEGIATAN = (id) => {

    return (dispatch) => {
        dispatch({
            type: GET_RIWAYAT_KEGIATAN,
            loading: true,
            list: [],
            error: null
        });

        Api.get(`/riwayat-kegiatan`, {
            headers: {
                Authorization:"Bearer "+store.getState().auth.token,
                Accept: "application/json",
            }
        }).then(function (res) {
            const {success,data,message}=res.data
            
            if(success){
                dispatch({
                    type: GET_RIWAYAT_KEGIATAN,
                    loading: false,
                    list: data,
                    error: null
                });
            }
            
        }).catch(function (error) {
            dispatch({
                type: GET_RIWAYAT_KEGIATAN,
                loading: false,
                list: [],
                error: error.message
            });
        });
    }
}

const RESET_DETAIL_KEGIATAN = () => {
    return (dispatch) => {
        dispatch({
            type: GET_DETAIL_KEGIATAN,
            loading: false,
            data: null,
            error: null
        });
    }
}

export {SET_LIST_KEGIATAN,SET_RIWAYAT_KEGIATAN,SET_DETAIL_KEGIATAN,RESET_DETAIL_KEGIATAN}