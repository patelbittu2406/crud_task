// SIGNIN REDUCER
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, CONFIRM_PASSWORD_REQUEST, CONFIRM_PASSWORD_SUCCESS, CONFIRM_PASSWORD_FAILURE } from '../Constants/signinConstants';

const initialState = {
    token: null,
    user: null,
    loading: false,
    error: null,
    email: null,
    isAuthenticated: false
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            const { token, user } = action.payload;
            return {
                ...state,
                token,
                user,
                loading: false,
                error: null,
                isAuthenticated: true
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                email: action.payload,
                error: null,
            };
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CONFIRM_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CONFIRM_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case CONFIRM_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default loginReducer;
