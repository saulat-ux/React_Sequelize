import NameInput from "../../components/input/NameInput";
import EmailInput from "../../components/input/EmailInput";
import PasswordInput from "../../components/input/PasswordInput";
import Button from "../../components/button/Button";
import { useEffect, useRef } from "react";
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


import "./auth.modules.css";
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH ,register } from "../../Redux/features/auth/authSlice";


const Register = () => {

    const dispatch = useDispatch();
    const {isLoading, isLoggedIn , isSuccess} = useSelector((state) => state.auth)
    const navigate = useNavigate();

    const formDataRef = useRef({
        name: '',
        email: '',
        password: '',

    });
    const handleFormDataChange = (fieldName, value) => {
        formDataRef.current[fieldName] = value;
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('form submited')
        console.log(formDataRef.current)
        await dispatch(register(formDataRef.current))

    }
     

 useEffect(() => {
    if(isSuccess && isLoggedIn) {
        navigate("/")
    }
    dispatch(RESET_AUTH())
},[isSuccess, isLoggedIn, dispatch, navigate])
    return (
        <div>
            <h2 className="heading">Register</h2>
            <form onSubmit={handleSubmit} className='signup-form'>
                <NameInput onChange={(value) => handleFormDataChange('name', value)} />
                <EmailInput onChange={(value) => handleFormDataChange('email', value)} />
                <PasswordInput onChange={(value) => handleFormDataChange('password', value)} />
                <Button>Register</Button>

            </form>
        </div>
    )
}

export default Register