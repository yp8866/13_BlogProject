import { Header,Footer } from './Components/index'
import React,{useState,useEffect} from 'react';
import {useDispatch} from 'react-redux'
import AuthServObj from './appwrite/auth'
import {login,logout} from './store/authSlice'
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  const [Loading, setLoading] = useState(true);
  const dispatch=useDispatch();
  
  useEffect(()=>{
    AuthServObj.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(
      setLoading(false)
    )
  },[])

  return !Loading ?
  (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
