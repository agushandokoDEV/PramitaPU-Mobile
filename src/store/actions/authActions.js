import axios from "axios";
import { AUTH_LOGIN, AUTH_LOGOUT,AUTH_REGISTER } from "../actionsType";
import { API_URL } from "@env";
import store from "..";
import Api from "../../helpers/Api";

const SET_AUTH_LOGIN = (params) => {

    const formdata = new FormData();
    formdata.append('username', params.username);
    formdata.append('password', params.password);

    // console.log('/authenticate', formdata)
    return (dispatch) => {
        dispatch({
            type: AUTH_LOGIN,
            loading: true,
            isLogin: false,
            user: null,
            token: '',
            error: null
        });

        Api.post('/authenticate', formdata, {
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

const SET_AUTH_REGISTER = (params) => {

    const formdata = new FormData();
    formdata.append('username', params.username);
    formdata.append('password', params.password);
    formdata.append('namalengkap', params.namalengkap);

    // console.log(Api+'/authenticate/register', formdata)
    return (dispatch) => {
        dispatch({
            type: AUTH_REGISTER,
            loading: true,
            isLogin: false,
            user: null,
            token: '',
            error: null
        });

        Api.post('/authenticate/register', formdata, {
            headers: {
                Accept: "application/json",
                'Content-Type': 'multipart/form-data;',
            }
        }).then(function (res) {
            const {success,data,token,message}=res.data
            // console.log(res.data)
            if(success){
                dispatch({
                    type: AUTH_REGISTER,
                    loading: false,
                    isLogin: true,
                    user: data,
                    token: token
                });
            }else{
                dispatch({
                    type: AUTH_REGISTER,
                    loading: false,
                    isLogin: false,
                    user: null,
                    token: '',
                    error:message
                });
            }
            
        }).catch(function (error) {
            dispatch({
                type: AUTH_REGISTER,
                isLogin: false,
                user: null,
                loading: false,
                error: error.message,
            });
        });
    }
}

const SET_AUTH_LOGOUT = (params) => {
    // console.log(store.getState().auth.token)
    return (dispatch) => {
        dispatch({
            type: AUTH_LOGOUT,
            loading: true,
            isLogin: params.isLogin,
            user: params.user,
            token: params.token,
        });

        Api.post('/account/logout', {
            headers: {
                Authorization:"Bearer "+store.getState().auth.token,
                Accept: "application/json"
            }
        }).then(function (res) {
            const {success,data,token,message}=res.data
            // console.log(res.data)
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

export { SET_AUTH_LOGIN,SET_AUTH_REGISTER, SET_AUTH_LOGOUT,SET_AUTH_RESET };