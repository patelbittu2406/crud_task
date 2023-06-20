import { REGISTER_SUCCESS,REGISTER_REQUEST,REGISTER_FAILURE } from "../Constants/signupConstants";
const initialState = {
    loading: false,
    error: null,
    isAuthenticated: false
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case REGISTER_SUCCESS:

            return {
                ...state,
                loading: false,  
                error: null,
                isAuthenticated: true
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false
            };
        default:
            return state;
    }
};

export default registerReducer;
