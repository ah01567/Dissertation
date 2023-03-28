// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGYUsorRF4DSUQku4II4J3ZK1Wr-TXams",
  authDomain: "myonlybook-1a99d.firebaseapp.com",
  projectId: "myonlybook-1a99d",
  storageBucket: "myonlybook-1a99d.appspot.com",
  messagingSenderId: "155178244880",
  appId: "1:155178244880:web:78cee79bb356a58755a395"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;