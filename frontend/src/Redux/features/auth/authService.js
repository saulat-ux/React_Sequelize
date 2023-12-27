import axios from "axios";

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const BACKEND_URL = 'http://localhost:3000/';




export const API_URL = `${BACKEND_URL}api/v1/user/`;

console.log(API_URL)

// Register user
// this will send the userdata to the backend as part of the req.body
const  register = async (userData) => {
    const response = await axios.post(API_URL + "register" , userData, {
        withCredentials: true,
    })
    return response.data
}
// login user
const  login = async (userData) => {
    const response = await axios.post(API_URL + "login" , userData ,{
        withCredentials: true,
    })
    // const { token } = response.data;
    // localStorage.setItem('token', token);
    // console.log(token)
    return response.data
}

// logout user
const  logout = async () => {
    const response = await axios.get(API_URL + "logout")
    return response.data.message
}

// get user
const  getUser = async () => {
    const response = await axios.get(API_URL + "getuser")
    return response.data
}

// update user
const  updateUser = async (userData) => {
    const response = await axios.patch(API_URL + "updateuser", userData)
    return response.data
}

// update photo
const  updatePhoto = async (userData) => {
    const response = await axios.patch(API_URL + "updatephoto", userData)
    return response.data
}
 // login status
const  getLoginStatus = async () => {
    const response = await axios.get(API_URL + "getloginstatus")
    console.log(response)
    return response.data;
}
const authService = {
    register,
    login,
    logout,
    getUser,
    updateUser,
    getLoginStatus,
    updatePhoto
}

export default authService
