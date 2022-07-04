import axios from "axios";
import { GET_LIST_TABUNG } from "../actionsType";
import { API_URL } from "@env";
import store from "..";

const SET_LIST_TABUNG = () => {

    // console.log(API_URL+'/tabung')
    return (dispatch) => {
        dispatch({
            type: GET_LIST_TABUNG,
            loading: true,
            list: [],
            error: null
        });

        axios.get(API_URL+'/tabung', {
            headers: {
                Authorization:"Bearer "+store.getState().auth.token,
                Accept: "application/json",
            }
        }).then(function (res) {
            const {success,data,message}=res.data
            
            // var list =[];
            // if(data.length > 0){
            //     data.forEach(item => {
            //         list.push({
            //             name:item.nama,
            //             id:item.id
            //         })
            //     });
            // }
            // // console.log(list)
            if(success){
                dispatch({
                    type: GET_LIST_TABUNG,
                    loading: false,
                    list: data,
                    error: null
                });
            }
            
        }).catch(function (error) {
            dispatch({
                type: GET_LIST_TABUNG,
                loading: false,
                list: [],
                error: error.message
            });
        });
    }
}

export {SET_LIST_TABUNG}