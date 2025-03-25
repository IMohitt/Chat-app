import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config';
import { auth } from '../firebase-config';

const Chat = (props) => {
   
  const {room} = props;  
  const [newMessage , setNewMessage] = useState("");   // this is typed message before sending
  const messageRef = collection(db , "messages")    // collection where we want to insert the data
  const [messages , setMessages] = useState([]);  // this is when we want to show the particular room messgaes on the ui

  useEffect(()=>{
    const queryMessage = query(messageRef , where("room" , "==" , room) , orderBy("time"))
    const unsubscribe = onSnapshot(queryMessage , (snapshot)=>{
        let messages = [];
        snapshot.forEach((doc)=>{
            messages.push({...doc.data() , id: doc.id})
        })
        setMessages(messages);
    });
    
    return ()=> unsubscribe();

  },[]);

  const submitHandle = async (e)=>{
     e.preventDefault();
     if(newMessage === "") return;

     if (!auth.currentUser) {
        alert("User not logged in!");
        return;
      }

     await addDoc(messageRef , {
        text: newMessage,
        time: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
     })                                     // for adding data we use addDoc

     setNewMessage("");
  }


  return (
   <div className='chat-app flex flex-col text-left border border-green-600 rounded-md mx-auto my-10 w-[50%]'>
    <div className='w-full bg-green-500 text-2xl text-white text-center font-bold'>
        <h1>Welcome to: {room}</h1>
    </div>
    <div className='p-4'>
        <div>{messages.map((message)=><div>
                <span className='font-semibold'>{message.user} </span>
                {message.text}
            </div> )
            }
        </div>
        <form onClick={submitHandle} className='flex flex-row w-full mt-4 border border-gray-500 rounded-full px-2 py-1'>
            <input
            className=' outline-none focus:outline-none w-full '
            placeholder='Type your message here...'
            onChange={(e)=> setNewMessage(e.target.value)}
            value={newMessage}
            />
            <button type='submit' className='bg-green-500 rounded-full text-white text-center p-2 text-sm'>send</button>
        </form>
     </div>
   </div>
  )
}

export default Chat