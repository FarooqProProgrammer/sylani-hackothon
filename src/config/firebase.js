// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth ,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQY1qh7UAEBAT6IozgAfuZrGVGOsIIT9I",
    authDomain: "app-1-a67e1.firebaseapp.com",
    projectId: "app-1-a67e1",
    storageBucket: "app-1-a67e1.appspot.com",
    messagingSenderId: "253115058209",
    appId: "1:253115058209:web:a898b1d0a474f3478b7b60"
  };


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



function SignIn(email,password){
  
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);

    
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}


export {
    SignIn
}