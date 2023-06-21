import React, { useState } from 'react'
import { forgotPassword, login } from '../Redux/Action/signinAction';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'


function SignIn() {
    const dispatch = useDispatch();

    const [LoginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleResetPassword=(e)=>{
        e.preventDefault();
        dispatch(forgotPassword(LoginData.email));
        navigate('/resetPass');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(LoginData);

        setLoginData({
            email: '', password: '',
        });
        
        dispatch(login(LoginData.email, LoginData.password))
        .then(() => {
          const accessToken = localStorage.getItem('accessToken');
          const user = JSON.parse(localStorage.getItem('user'));
          if (user.access_type === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/products');
          }
        })
        .catch((error) => {
          console.log('Login failed:', error);
        });
    }

    return (
        <div className='login template d-flex justify-content-center align-items-center vh-100'>
            <div className='form_container bg-white rounded p-5'>

                <form action="" onSubmit={handleSubmit}>
                    <h3 className='text-center'>Sign-In</h3>

                    <div className='mb-3'>
                        <label htmlFor="name">Email</label>
                        <input type="email" placeholder='Enter Email' name='email' value={LoginData.email} onChange={handleInputChange} className='form-control rounded-0' />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter Password' name='password' value={LoginData.password} onChange={handleInputChange} className='form-control rounded-0' />
                    </div>

                    <div className="d-grid">
                        <button type='submit' className='btn bg-black text-white w-100 rounded-0'>
                            SignIn
                        </button>
                    </div>

                    <p className='text-end mt-2'>
                        <Link onClick={handleResetPassword}>Forgot Password?</Link>Sign up
                    </p>

                </form>
            </div>
        </div>
    )
}
export default SignIn