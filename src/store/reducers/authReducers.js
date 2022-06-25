import { AUTH_LOGIN, AUTH_LOGOUT } from "../actionsType";

const initialAuthState = {
    loading: false,
    isLogin: false,
    user: null,
    token:'',
    error: null
}

export default (state = initialAuthState, actions) => {
    switch (actions.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                loading: actions.loading,
                isLogin: actions.isLogin,
                user: actions.user,
                token: actions.token,
                error: actions.error
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                loading: actions.loading,
                isLogin: actions.isLogin,
                user: actions.user,
                error: actions.error
            }
        default:
            return state;
    }
}