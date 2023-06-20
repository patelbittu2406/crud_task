import {
  EMAIL_VERIFY_REQUEST,
  EMAIL_VERIFY_SUCCESS,
  EMAIL_VERIFY_FAILURE,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE,
} from '../Constants/emailverifyConstants';
import api from '../../Service/api';

export const emailVerifyRequest = () => {
  return {
    type: EMAIL_VERIFY_REQUEST,
  };
};

export const emailVerifySuccess = () => {
  return {
    type: EMAIL_VERIFY_SUCCESS,
  };
};

export const emailVerifyFailure = (error) => {
  return {
    type: EMAIL_VERIFY_FAILURE,
    payload: error,
  };
};

export const verifyEmail = (email, code) => {
  return (dispatch) => {
    dispatch(emailVerifyRequest());

    api
      .post('/auth/verify-email', { email, code })
      .then(response => {
        dispatch(emailVerifySuccess(response.data));
      })
      .catch(error => {
        dispatch(emailVerifyFailure(error.message));
      });
  };
};



// RESEND OTP

export const resendOTPRequest = () => {
  return {
    type: RESEND_OTP_REQUEST,
  };
};

export const resendOTPSuccess = () => {
  return {
    type: RESEND_OTP_SUCCESS,
  };
};

export const resendOTPFailure = (error) => {
  return {
    type: RESEND_OTP_FAILURE,
    payload: error,
  };
};

export const resendOTP = (email) => {
  return (dispatch) => {
    dispatch(resendOTPRequest());

    api
      .post('/auth/resendOTP', { email })
      .then(response => {
        dispatch(resendOTPSuccess());
      })
      .catch(error => {
        dispatch(resendOTPFailure(error.message));
      });
  };
};