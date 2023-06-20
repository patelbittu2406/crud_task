import React, { useState } from 'react'
import { register } from '../Redux/Action/signupAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const [SignUpData, setSignUpData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSignUpData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(SignUpData);
        dispatch(register(SignUpData));
        navigate('/emailverify');
        alert('otp sent to your mail')
        
    }

    return (
        <div className='signup template d-flex justify-content-center align-items-center vh-100'>
            <div className='form_container bg-white rounded p-5'>
                <form action="" onSubmit={handleSubmit}>
                    <h3 className='text-center'>Sign-Up</h3>

                    <div className='mb-3'>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            name='name' 
                            value={SignUpData.name}
                            onChange={handleInputChange}
                            className='form-control rounded-0' />

                    </div>

                    <div className='mb-3'>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder='Enter Username'
                            name='username'
                            value={SignUpData.username}
                            onChange={handleInputChange}
                            className='form-control rounded-0' />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            name='email'
                            value={SignUpData.email}
                            onChange={handleInputChange}
                            className='form-control rounded-0' />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            name='password'
                            value={SignUpData.password}
                            onChange={handleInputChange}
                            className='form-control rounded-0' />
                    </div>

                    <div className="d-grid">
                        <button type='submit' className='btn text-white bg-black w-100 rounded-0'>Sign Up</button>
                    </div>

                    <p className='text-end mt-2'>Already Registered Sign in</p>
                </form>
            </div>
        </div>
    )
}

export default SignUp
