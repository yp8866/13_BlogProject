import { Header,Footer } from './Components/index'
import React,{useState,useEffect} from 'react';
import {useDispatch} from 'react-redux'
import AuthServObj from './appwrite/auth'
import {login,logout} from './store/authSlice'
import './App.css'

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
    <>
      <div className='bg-red flex justify-center items-center h-screen'>
        Hey I am Not Loading
        <Header/>
        <main>
          outlet
        </main>
        <Footer/>
      </div>
    </>
  )
  :
  (
    <>
    Loading....
    </>
  )
}

export default App
