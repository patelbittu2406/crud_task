import { EMAIL_VERIFY_REQUEST, EMAIL_VERIFY_SUCCESS, EMAIL_VERIFY_FAILURE, RESEND_OTP_REQUEST, RESEND_OTP_SUCCESS, RESEND_OTP_FAILURE } from '../Constants/emailverifyConstants';

const initialState = {
  loading: false,
  error: null,
};

const emailVerifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EMAIL_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case EMAIL_VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RESEND_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case RESEND_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default emailVerifyReducer;
