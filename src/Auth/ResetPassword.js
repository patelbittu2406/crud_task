import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { confirmPassword } from '../Redux/Action/signinAction';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        code: '',
        newpass: '',
        conpass: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            "email": values.email,
            "code": values.code,
            "newpassword": values.newpass,
            "confirmpassword": values.conpass,
        }
        if (dispatch(confirmPassword(newData))) {
            navigate('/');
        }
        console.log(newData, "newData");

    };

    return (
        <div className='login template d-flex justify-content-center align-items-center vh-100'>
            <div className='form_container bg-white rounded p-5'>
                <h3 className='text-center'>Reset Password</h3>
                <form action="" onSubmit={handleSubmit}>

                    <div className='mb-3'>
                        <label htmlFor="name">Email</label>
                        <input type="text" name="email" value={values.email} className='form-control' onChange={handleInputChange} placeholder='Enter Email' />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="code">Code</label>
                        <input type="text" name="code" className='form-control' maxLength='6' pattern="\d{6}" value={values.code} onChange={handleInputChange} placeholder='XXXXXX' />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password">New Password</label>
                        <input type="password" name="newpass" className='form-control' value={values.newpass} onChange={handleInputChange} placeholder='New Password' />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" name="conpass" className='form-control' value={values.conpass} onChange={handleInputChange} placeholder='Confirm Password' />
                    </div>
                    <div className="d-grid">
                        <button className='btn bg-black text-white w-100 rounded-0' type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword