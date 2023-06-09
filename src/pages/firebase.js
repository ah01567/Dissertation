// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// import Firebase Database 
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGYUsorRF4DSUQku4II4J3ZK1Wr-TXams",
  authDomain: "myonlybook-1a99d.firebaseapp.com",
  databaseURL: 'https://myonlybook-1a99d-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: "myonlybook-1a99d",
  storageBucket: "myonlybook-1a99d.appspot.com",
  messagingSenderId: "155178244880",
  appId: "1:155178244880:web:78cee79bb356a58755a395"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Export the Firebase Realtime Database object
export const db = getDatabase();

export default app;