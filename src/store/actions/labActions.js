import axios from "axios";
import { GET_LIST_LAB } from "../actionsType";
import { API_URL } from "@env";
import store from "..";

const SET_LIST_LAB = () => {

    // console.log('GET_LIST_LAB', API_URL+'/lab')
    // console.log('STORE',store.getState().auth.token)
    return (dispatch) => {
        dispatch({
            type: GET_LIST_LAB,
            loading: true,
            list: [],
            error: null
        });

        axios.get(API_URL+'/lab', {
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
            console.log(list)
            if(success){
                dispatch({
                    type: GET_LIST_LAB,
                    loading: false,
                    list: list,
                    error: null
                });
            }
            
        }).catch(function (error) {
            dispatch({
                type: GET_LIST_LAB,
                loading: false,
                list: [],
                error: error.message
            });
        });
    }
}

export {SET_LIST_LAB}