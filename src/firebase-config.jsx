// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: <your_api_key>,
  authDomain: "chatapp-28970.firebaseapp.com",
  projectId: "chatapp-28970",
  storageBucket: "chatapp-28970.appspot.com",
  messagingSenderId: "297766419602",
  appId: "1:297766419602:web:eb814b69b0a5dbdcef3a4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);