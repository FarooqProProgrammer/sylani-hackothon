// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth ,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {getFirestore , doc, setDoc ,collection,query, addDoc,onSnapshot } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import {getStorage, ref ,uploadBytes ,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'

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
const storage = getStorage(app);


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

async function addcourse(name,another){

    let {clastiming,shedle,teachersName,SectionName,corseName,batchNamber} = another

    let docment = {
        classtiming:clastiming,
        scheduleOfClass:shedle,
        teachers_name:teachersName,
        SectionName : SectionName,
        corse_name: corseName,
        batch_nmber : batchNamber
    }
  // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "WEB AND MOBILE "), docment);
  console.log("Document written with ID: ", docRef.id);
}   



// ================== get real time Class Data =============================
function getRealtime(){

    const q = query(collection(db, "WEB AND MOBILE "));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
          cities.push({id:doc.id,...doc.data()});
      });
      console.log( cities);


      let showclass = document.getElementById("showclass")
      showclass.innerHTML = ''
      for(let i =0;i<cities.length;i++){
        console.log(cities[i].id);
        showclass.innerHTML += `
        <div class="class_1 w-[90%] h-[100px] border-2 border-black mt-5 flex justify-between items-center pl-5 pr-5">

        <div class="sno w-[100px] h-[70px] border-2 border-black text-center pt-5">${cities[i].SectionName}</div>
        <div class="name w-[300px] h-[70px] border-2 border-black text-center pt-5">${cities[i].teachers_name}</div>
        <div class="view w-[100px] h-[70px] border-2 border-black">

           <button class="w-full h-[100%] border-2 border-black" onclick="gotoClass('${cities[i].id}')">View</button>

        </div>
        

     </div>
        `
        

      }


    });



}


// ===================== goto classs =================================
window.gotoClass = function (val){


    location.href = `./stdents.html?=${val}`


}



// ================= Pload Image =======================================
async function uploadImage(image){
    const storageRef = ref(storage,`images/${image.name}`)
    const snapshot = await uploadBytes (storageRef,image)
    const url = await getDownloadURL(snapshot.ref)
    return url
  }



  
getRealtime()
export {
    SignIn,
    addcourse,
    uploadImage
}