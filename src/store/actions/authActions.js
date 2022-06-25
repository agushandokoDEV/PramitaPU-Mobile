import axios from "axios";
import { AUTH_LOGIN, AUTH_LOGOUT } from "../actionsType";
import { API_URL } from "@env";

const SET_AUTH_LOGIN = (params) => {

    console.log('GET_LIST_LAB', API_URL+'/authenticate')

    const formdata = new FormData();
    formdata.append('username', params.username);
    formdata.append('password', params.password);
    return (dispatch) => {
        dispatch({
            type: AUTH_LOGIN,
            loading: true,
            isLogin: false,
            user: null,
            token: '',
            error: null
        });

        axios.post(API_URL+'/authenticate', formdata, {
            headers: {
                Accept: "application/json",
                'Content-Type': 'multipart/form-data;',
            }
        }).then(function (res) {
            const {success,data,token,message}=res.data
            // console.log(message)
            if(success){
                dispatch({
                    type: AUTH_LOGIN,
                    loading: false,
                    isLogin: true,
                    user: data,
                    token: token
                });
            }else{
                dispatch({
                    type: AUTH_LOGIN,
                    loading: false,
                    isLogin: false,
                    user: null,
                    token: '',
                    error:message
                });
            }
            
        }).catch(function (error) {
            dispatch({
                type: AUTH_LOGIN,
                isLogin: false,
                user: null,
                loading: false,
                error: error.message,
            });
        });
    }
}

const SET_AUTH_LOGOUT = () => {
    return (dispatch) => {
        dispatch({
            type: AUTH_LOGOUT,
            loading: false,
            isLogin: false,
            user: null,
            token: '',
            error: null
        });
    }
}

export { SET_AUTH_LOGIN, SET_AUTH_LOGOUT };