import React from 'react';
import {useDispatch} from 'react-redux'
import AuthServObj from '../../appwrite/auth' 
import {logout} from '../../store/authSlice'

const LogoutBtn = () => {
    const dispatch= useDispatch();
    const logoutHandler=()=>{
        AuthServObj.logout()
        .then(()=>{
          dispatch(logout())   
        })
        .catch((error)=>{
            console.log("Error in Logout Btn: ",error)
        })
    }
    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' 
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
