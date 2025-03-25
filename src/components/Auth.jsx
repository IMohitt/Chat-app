import React from 'react'
import {auth , provider} from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'
const cookies = new Cookies();

const Auth = (props) => {
    const {setIsAuth} = props;
   const clickHandle = async ()=>{
    try{
        const result = await signInWithPopup(auth,provider)
        cookies.set("auth-token", result.user.refreshToken)
        setIsAuth(true);
    }catch(err){
        console.log(err);
    }
    
  }
  return (
    <>
      <div className='flex flex-col items-center mx-auto w-[50%] my-10 border border-green-500 rounded-md pb-3'>
        <p className='w-full bg-green-500 text-xl text-white text-center font-semibold p-2'>Sign In using Google Account</p>
        <button onClick={clickHandle} className=' border border-black rounded-md px-4 bg-gray-200 mt-4' >Click to Sign In</button>
      </div>
      
    </>
  )
}

export default Auth