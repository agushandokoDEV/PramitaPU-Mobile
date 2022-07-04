import { AMBIL_BAHAN } from "../actionsType";

const initialState = {
    loading: false,
    data:null,
    message:null,
    error: null
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case AMBIL_BAHAN:
            return {
                ...state,
                loading: actions.loading,
                data: actions.data,
                message: actions.message,
                error: actions.error
            }
        default:
            return state;
    }
}