import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, CONFIRM_PASSWORD_REQUEST, CONFIRM_PASSWORD_SUCCESS, CONFIRM_PASSWORD_FAILURE } from "../Constants/signinConstants"
import api from "../../Service/api";

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};

export const loginSuccess = (token, user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token,
            user
        }
    };
};

export const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        payload: {
            error
        }
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch(loginRequest());

        try {
            const response = await api.post('/auth/login', { email, password });
            const { accessToken } = response.data.data.accessToken;
            const { user } =response.data.data;
            console.log(user, "user");
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            dispatch(loginSuccess(response.data.data));
        } catch (error) {
            dispatch(loginFailure(error.message));
        }
    };
};

//FORGOT PASSWORD

export const forgotPasswordRequest = () => {
    return {
        type: FORGOT_PASSWORD_REQUEST,
    };
};
export const forgotPasswordSuccess = (email) => {
    return {
        type: FORGOT_PASSWORD_SUCCESS,
        payload: email,
    };
};

export const forgotPasswordFailure = (error) => {
    return {
        type: FORGOT_PASSWORD_FAILURE,
        payload: error,
    };
};

export const forgotPassword = (email) => {
    return (dispatch) => {
        dispatch(forgotPasswordRequest());

        api.post('/auth/password/email', { email })
            .then(response => {
                dispatch(forgotPasswordSuccess(response.data));
            })
            .catch(error => {
                dispatch(forgotPasswordFailure(error.message));
            });
    };
};



// NEW PASSWORD OLD PASSWORD

export const confirmPasswordRequest = () => {
    return {
        type: CONFIRM_PASSWORD_REQUEST,
    };
};
export const confirmPasswordSuccess = (data) => {
    return {
        type: CONFIRM_PASSWORD_SUCCESS,
        payload: data,
    };
};

export const confirmPasswordFailure = (error) => {
    return {
        type: CONFIRM_PASSWORD_FAILURE,
        payload: error,
    };
};

export const confirmPassword = (userdata) => {
    return (dispatch) => {
        dispatch(confirmPasswordRequest());

        api.post('/auth/password/confirm', userdata)
            .then(response => {
                dispatch(confirmPasswordSuccess(response.data.data));
            })
            .catch(error => {
                dispatch(confirmPasswordFailure(error.message));
            });
    };
};