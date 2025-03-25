import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'
import Chat from './components/Chat'
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room , setRoom] = useState(null);
  const roomInputRef = useRef();

  const signOutHandle = async () => {
    await signOut(auth)
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  if(!isAuth){
    return (
      <>
       <div><Auth setIsAuth={setIsAuth} /></div>
      </>
    )
  }

  return(
     <>
       {room ? (
        <div> <Chat room={room} /> </div> 
      ) 
        : (
        <div className='flex flex-col gap-y-4 items-center text-green-500 border border-green-500 rounded-md mx-auto w-[300px] p-4 my-10'>
          <label className='text-2xl'>Enter Room Name:</label>
          <input ref={roomInputRef} className='text-center border border-green-400 w-[70%] rounded-md'/>
          <button onClick={()=> setRoom(roomInputRef.current.value)} className='text-white bg-green-400 rounded-md px-4 w-[70%]'>Enter Chat</button>
        </div> )
         }

       <div>
          <button onClick={signOutHandle} className='text-white bg-gray-400 rounded-md px-4 w-[100px] mx-auto flex justify-center'>Sign out</button>
       </div>

     </>
  
  )
  
}

export default App
