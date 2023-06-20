import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resendOTP, verifyEmail } from '../Redux/Action/emailverifyAction';

function EmailVerify() {

    const dispatch = useDispatch();

    const [values, setValues] = useState({
        email: '',
        code: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleResend = () => {
        dispatch(resendOTP(values.email));
        console.log('Resend');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(verifyEmail(values.email, values.code));
    };

    return (
        <div className='login template d-flex justify-content-center align-items-center vh-100'>
            <div className='form_container bg-white rounded p-5'>
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center'>Email Verify</h3>

                    <div className='mb-3'>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" placeholder='Enter Email Address' name='email' value={values.email} onChange={handleInputChange} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email">Verification Code</label>
                        <input type="text" maxLength='6' pattern="\d{6}" placeholder='XXXXXX' value={values.code} name='code' onChange={handleInputChange} className='form-control rounded-0' />
                    </div>
                    <Link onClick={handleResend}>Resend OTP</Link>
                    <div className="d-grid">
                        <button type='submit' className='btn bg-black text-white w-100 rounded-0'> Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmailVerify
