
import EmailInput from "../../components/input/EmailInput";
import PasswordInput from "../../components/input/PasswordInput";
import Button from "../../components/button/Button";
import { useEffect, useRef } from "react";

import "./auth.modules.css";
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, login } from "../../Redux/features/auth/authSlice";


const Login = () => {
    const dispatch = useDispatch()
    const {isLoading, isLoggedIn , isSuccess} = useSelector((state) => state.auth)
   const navigate = useNavigate();
  
    const formDataRef = useRef({
        email: '',
        password: '',

    });
    const handleFormDataChange = (fieldName, value) => {
        formDataRef.current[fieldName] = value;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formDataRef.current)
        await dispatch(login(formDataRef.current))
    }

    useEffect(() => {
        if(isSuccess && isLoggedIn) {
            navigate("/profile")
        
    
        }
        dispatch(RESET_AUTH())
    },[isSuccess, isLoggedIn, dispatch, navigate])
    return (
        <div>
            <h2 className="heading">Login</h2>
            <form onSubmit={handleSubmit} className='signup-form'>
                <EmailInput onChange={(value) => handleFormDataChange('email', value)} />
                <PasswordInput onChange={(value) => handleFormDataChange('password', value)} />

                <Button> Login Button</Button>

            </form>
        </div>
    )
}

export default Login