// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDboA8edCFDrKmDcX-bKijkZ6SklcYuguQ",
  authDomain: "desiqna-foodapp.firebaseapp.com",
  projectId: "desiqna-foodapp",
  storageBucket: "desiqna-foodapp.appspot.com",
  messagingSenderId: "323792364745",
  appId: "1:323792364745:web:19b62b0a9879063f661918",
};


/*const firebaseConfig = {
  apiKey: "AIzaSyDMQgLwbrM70N6lwPcOwqpfPPojyFCoum0",
  authDomain: "foodapp-client-main-b4342.firebaseapp.com",
  projectId: "foodapp-client-main-b4342",
  storageBucket: "foodapp-client-main-b4342.appspot.com",
  messagingSenderId: "554415429314",
  appId: "1:554415429314:web:bd77878a6252a4318a4d5b",
  measurementId: "G-JDMTNK7JSL"
};*/

/*
const firebaseConfig = {
  apiKey: "AIzaSyCH7-CPn_uPV8S2Yu4qgnSiaiBE7ST8nIE",
  authDomain: "newfolder-f2b49.firebaseapp.com",
  projectId: "newfolder-f2b49",
  storageBucket: "newfolder-f2b49.appspot.com",
  messagingSenderId: "299630394187",
  appId: "1:299630394187:web:469a3c67f49be8ee53c6ce",
  
};*/


/*const firebaseConfig = {
  apiKey: "AIzaSyDnF3rh0du58hkcqgcHxC9iLHmK6iJsw_4",
  authDomain: "foodi-client-d1b37.firebaseapp.com",
  projectId: "foodi-client-d1b37",
  storageBucket: "foodi-client-d1b37.appspot.com",
  messagingSenderId: "647763270947",
  appId: "1:647763270947:web:0ccf802b3edbaf9a9d4096",
  measurementId: "G-92PYVF80RN"
};*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
