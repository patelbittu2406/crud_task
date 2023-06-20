import api from "../../Service/api";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../Constants/signupConstants"


export const registerRequest = () => {
    return {
        type: REGISTER_REQUEST
    };
};

export const registerSuccess = (data) => {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    };
};

export const registerFailure = (error) => {
    return {
        type: REGISTER_FAILURE,
        payload: error
    };
};

export const register = (userData) => {
    return (dispatch) => {
        api
            .post('/auth/signup', userData)
            .then(response => {
                dispatch(registerSuccess(response.data.data));
            })
            .catch(error => {
                dispatch(registerFailure(error.message));
            });
    };
};

