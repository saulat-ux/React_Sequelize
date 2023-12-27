
import { BrowserRouter, Routes ,Route } from "react-router-dom"
import Register from "./pages/auth/Register"
import Login from './pages/auth/Login'
import Profile from "./pages/profile/Profile"
import Header from "./components/header/Header"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { getLoginStatus } from "./Redux/features/auth/authSlice"

function App() {
  axios.defaults.withCredentials = true
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoginStatus())
  },[dispatch])

  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
    <Header/>
      <Routes>
        <Route path="/profile" element= {<Profile/>} />
        <Route path="/" element= {<Login/>} />
        <Route path="/register" element= {<Register/>} />
        

      </Routes>
     
    </BrowserRouter>
  </>
  )
}

export default App
