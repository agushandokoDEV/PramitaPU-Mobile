import axios from "axios";
import { AUTH_LOGIN, AUTH_LOGOUT } from "../actionsType";
import { API_URL } from "@env";
import store from "..";

const SET_AUTH_LOGIN = (params) => {

    const formdata = new FormData();
    formdata.append('username', params.username);
    formdata.append('password', params.password);

    // console.log(API_URL+'/authenticate', formdata)
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
    console.log(store.getState().auth.token)
    return (dispatch) => {
        dispatch({
            type: AUTH_LOGOUT,
            loading: true
        });

        axios.post(API_URL+'/account/logout', {
            headers: {
                Authorization:"Bearer "+store.getState().auth.token,
                Accept: "application/json"
            }
        }).then(function (res) {
            const {success,data,token,message}=res.data
            console.log(res.data)
            if(success){
                dispatch({
                    type: AUTH_LOGOUT,
                    loading: false,
                    isLogin: false,
                    user: null,
                    token: null,
                    error: null
                });
            }
            
        }).catch(function (error) {
            console.log(error)
            dispatch({
                type: AUTH_LOGOUT,
                isLogin: false,
                user: null,
                loading: false,
                error: null,
            });
        });
    }
}

const SET_AUTH_RESET = () => {
    return (dispatch) => {
        dispatch({
            type: AUTH_LOGIN,
            loading: false,
            isLogin: false,
            user: null,
            token: '',
            error: null
        });
    }
}

export { SET_AUTH_LOGIN, SET_AUTH_LOGOUT,SET_AUTH_RESET };