import{ADD_DATA,getRealTimeStdents} from './config/firebase.js'

window.Add = function (){

    let body  = document.getElementById("whole_body")
   
    
    body.classList.add("hidden")

    let modalADD  = document.getElementById("modalAdd")
    modalADD.classList.add("absolute")
    modalADD.classList.remove("hidden")

    
}

document.getElementById('hideModal').addEventListener("click",()=>{

    let body  = document.getElementById("whole_body")
   
    
    body.classList.remove("hidden")

    let modalADD  = document.getElementById("modalAdd")
    modalADD.classList.remove("absolute")
    modalADD.classList.add("hidden")

})


// ===================== Qery Paramas =============
function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

window.addStdentDetail =  async function (event){
    event.preventDefault()
    let v = window.location.href
    let id = v.slice(v.indexOf('=')+1)
    

    let name = document.getElementById('Name').value
    let className = document.getElementById('class').value
    let father = document.getElementById('father').value
    let Roll = document.getElementById('Roll').value
    let Contact = document.getElementById('Contact').value
    let cnic = document.getElementById('cnic').value
    let file = document.getElementById('file').value



    let collection = {
        name:name,
        className:className,
        fatherName:father,
        Roll_No : name+generatePassword(),
        Contact :Contact,
        cnic :cnic,
        file:file,
        isExist:true
    }

    await ADD_DATA(id,collection)

    
}



showStdents()
async function showStdents(){
   let data = await getRealTimeStdents()


   let showStdents = document.getElementById("showStdents")

   for(let i = 0 ;i<data.length;i++){

     showStdents.innerHTML += 
     `
     <div class="profile_ui_cards w-[300px] h-[350px] border-2 border-black mt-4">
     <div class="imge_card w-full h-[150px] border-2 border-black flex justify-center items-center">
         <div class="img w-[100px] h-[100px] border-2 border-black " style="background-image:url(${data[i].file}) background-size:100% 100%;">
        
         </div>

     </div>
     <div class="detailcard w-full h-[200px] border-2 border-black">
        <p class="text-xl font-black ml-2 mt-2">Name: <span>${data[i].name}</span> </p>
        <p class="text-xl font-black ml-2 mt-2">Father Name: <span>${data[i].fatherName}</span></p>
        <p class="text-xl font-black ml-2 mt-2"> class: <span>${data[i].className}</span></p>
        <button class="text-xl font-black ml-2 mt-2"> Attendance Detail</button>
     </div>
  </div>
     `
   }
}