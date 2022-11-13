// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth ,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {getFirestore , doc, setDoc,deleteDoc  ,arrayUnion,getDocs,collection,query, addDoc,updateDoc ,where} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// import {getStorage, ref ,uploadBytes ,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'

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
// const storage = getStorage(app);


// ===================================== SIGN IN===================================
function SignIn(email,password){
  
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);

      window.location = './src/index2.html'
    
      
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
async function getRealtime(){

    const q = query(collection(db, "WEB AND MOBILE "));
    const querySnapshot = await getDocs(q);

    const data = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log({});
      data.push({id:doc.id,... doc.data()})
    });



      return data 


    



}






// ================= Pload Image =======================================
// async function uploadImage(image){
//     const storageRef = ref(storage,`images/${image.name}`)
//     const snapshot = await uploadBytes (storageRef,image)
//     const url = await getDownloadURL(snapshot.ref)
//     return url
//   }



  
// getRealtime()

function generatePassword() {
  var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

// =================== Get Data ===============================
async function ADD_DATA(rool,id,collection1){
  const {Roll_No} = collection1
  localStorage.setItem("ClassID",JSON.stringify(id))
 
  console.log(collection1);
// Add a new document in collection "cities"
  await setDoc(doc(db, `WEB AND MOBILE `,id, "stdents", Roll_No),collection1)
  console.log('dasdawdawd');
  window.location.reload()
} 



// ================================ Get Real Times ================================
async function getRealTimeStdents(){

  let id = JSON.parse(localStorage.getItem("id_classrom"))

  const q = query(collection(db, `WEB AND MOBILE /${id}`, "stdents"));
  let data = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log({id:doc.id, ...doc.data()});
    data.push({id:doc.id, ...doc.data()})
  });
  return data
    
    

    // ================================================ MArk Attendance =========================



 

}
async function markAttendance(id,Roll_No,rollnmber){

  const washingtonRef = doc(db, `WEB AND MOBILE `,id, `stdents`,Roll_No);

  let d = new Date()
  let data1 = {
    attend:rollnmber,
    date:d.getDate(),
    time:d.getHours()+','+d.getMinutes()+','+d.getSeconds()
  }
  
// Add a new document with a generated id.
  await updateDoc(washingtonRef, {
    Attendence: arrayUnion(data1)
  });

  
  const q = query(collection(db, `WEB AND MOBILE `,id, `stdents`),where("Roll_No","==", Roll_No));
  let data = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log({id:doc.id, ...doc.data()});
    data.push({id:doc.id, ...doc.data()})
  });
  console.log(data);
  return data
}

markAttendance()



//  ====================================== Delete Class ===========================
async function deleteClass(id){


  await deleteDoc(doc(db, "WEB AND MOBILE ", id));
  console.log("Delete Successfully");
}

async function deletestdent(id,classID){


  await deleteDoc(doc(db, "WEB AND MOBILE ",classID,'stdents', id));
  console.log("Delete Successfully");
}

export {
    SignIn,
    addcourse,
    ADD_DATA,
    getRealTimeStdents,
    getRealtime,
    markAttendance,
    deleteClass,
    deletestdent
  }