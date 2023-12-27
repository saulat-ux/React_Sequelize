import { useSelector } from "react-redux";

const ShowOnLogin = ({children}) => {

    const { isLoggedIn} = useSelector((state) => state.auth)

    if(isLoggedIn){
        return children
    }else{
        return null
    }
}
export const ShowOnLogout = ({children}) => {

    const { isLoggedIn} = useSelector((state) => state.auth)

    if(!isLoggedIn){
        return children
    }else{
        return null
    }
}

export default ShowOnLogin

