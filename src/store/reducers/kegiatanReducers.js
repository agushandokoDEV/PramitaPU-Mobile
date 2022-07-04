import { GET_LIST_KEGIATAN,GET_DETAIL_KEGIATAN,GET_RIWAYAT_KEGIATAN } from "../actionsType";

const initialState = {
    loading: false,
    list: [],
    error: null,
    detail:{
        loading:false,
        data:null,
        error:null
    },
    riwayat:{
        loading: false,
        list: [],
        error: null,
    }
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_LIST_KEGIATAN:
            return {
                ...state,
                loading: actions.loading,
                list: actions.list,
                error: actions.error
            }
        case GET_DETAIL_KEGIATAN:
            return {
                ...state,
                detail:{
                    ...state.detail,
                    loading: actions.loading,
                    data: actions.data,
                    error: actions.error
                }
            }
        case GET_RIWAYAT_KEGIATAN:
            return {
                ...state,
                riwayat:{
                    ...state.riwayat,
                    loading: actions.loading,
                    list: actions.list,
                    error: actions.error
                }
            }
        default:
            return state;
    }
}