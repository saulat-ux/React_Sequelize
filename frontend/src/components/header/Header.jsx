import { Link, NavLink,useNavigate  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { RESET_AUTH , logout } from "../../Redux/features/auth/authSlice";
import ShowOnLogin, {ShowOnLogout} from "./HiddenLinks/HiddenLink";

import './header.modules.css'



const Header = () => {
 
  

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const logoutUser = async() => {
    await dispatch(logout())
    await dispatch(RESET_AUTH())
    navigate("/")
 
  
   }

  return (
    <header>
      <div className="">
        <nav className="">
        

          <ul className="">
          <ShowOnLogin>
            <li className="">
              <NavLink to={"/profile"}>Profile</NavLink>
            </li>
            </ShowOnLogin>

            <ShowOnLogout>
            <li className="">
              <NavLink to={"/"}>Login</NavLink>
            </li>
            </ShowOnLogout>
            <ShowOnLogout>
            <li className="">
              <NavLink to={"register"}>Register</NavLink>
            </li>
            </ShowOnLogout>
          
          <ShowOnLogin>
            <li className=""  onClick={logoutUser}>
              <NavLink to={"logout"}>Logout</NavLink>
            </li>
            </ShowOnLogin>
          
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
