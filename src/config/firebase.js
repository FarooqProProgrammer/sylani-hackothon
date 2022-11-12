// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth ,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {getFirestore , doc, setDoc ,collection, addDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";


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
const db = getFirestore(app);



// ===================================== SIGN IN===================================
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

// ======================= ADD CLASS =========================================

async function ADDCLASS(){
        // Add a new document in collection "cities"
    await setDoc(doc(db, "WEB AND MOBILE SIR HAIDER", "9 - 11 "), {
        BatchNumber: "08",
        courseNumber: "121",
        scheduleOfClass: "mwf",
        Section_Name :"A",
        teacherName:"Haider",
        class_timming:"11 - 01"
    });
}
ADDCLASS()


async function ADD_Nested_Class(){
    await setDoc(doc(db, "WEB AND MOBILE SIR HAIDER", "9 - 11 pm", "9-11 pm", "kahsif"), {
        BatchNumber: "08",
        courseNumber: "121",
        scheduleOfClass: "mwf",
        Section_Name :"A",
        teacherName:"Haider",
        class_timming:"11 - 01"
    });

}
ADD_Nested_Class()


// ==================================== add course ========================================

async function addcourse(name){
    const docRef = await addDoc(collection(db, name), {
        name: name,
        Time: Date.now()
      });
      console.log("Document written with ID: ", docRef.id);
      console.log('add successuflly');
}   

export {
    SignIn,
    addcourse
}