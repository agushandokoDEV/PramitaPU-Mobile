import { ADD_KEG_LAINNYA } from "../actionsType";

const initialState = {
    loading: false,
    data:null,
    message:null,
    error: null
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_KEG_LAINNYA:
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