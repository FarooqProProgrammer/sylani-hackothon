import{ADD_DATA,getRealTimeStdents,getRealtimeData,markAttendance,deletestdent,update,singlestudents} from './config/firebase.js'


document.getElementById("add").addEventListener("click",()=>{
    let body  = document.getElementById("whole_body")
   
    
    body.classList.add("hidden")

    let modalADD  = document.getElementById("modalAdd")
    modalADD.classList.add("absolute")
    modalADD.classList.remove("hidden")
    
})
document.getElementById('hideModal').addEventListener("click",()=>{

    let body  = document.getElementById("whole_body")
   
    
    body.classList.remove("hidden")

    let modalADD  = document.getElementById("modalAdd")
    modalADD.classList.remove("absolute")
    modalADD.classList.add("hidden")

})


// ========================== update modal ========================================


// window.update = function(){
    
//     let body  = document.getElementById("whole_body")
   
    
//     body.classList.add("hidden")

//     let modalADD  = document.getElementById("updateAdd")
//     modalADD.classList.add("absolute")
//     modalADD.classList.remove("hidden")
    
// }

// document.getElementById("hidepdateModal").addEventListener("click",async ()=>{

//     let body  = document.getElementById("whole_body")
   
    
//     body.classList.remove("hidden")

//     let modalADD  = document.getElementById("updateAdd")
//     modalADD.classList.remove("absolute")
//     modalADD.classList.add("hidden")


// })

document.getElementById("attendance").addEventListener("click",()=>{

    let body  = document.getElementById("whole_body")
    body.classList.add("hidden")


    let modalADD  = document.getElementById("modalad")
    modalADD.classList.add("absolute")
    modalADD.classList.remove("hidden")



})




document.getElementById('hideModalAd').addEventListener("click",()=>{
    let body  = document.getElementById("whole_body")
    body.classList.remove("hidden")


    let modalADD  = document.getElementById("modalad")
    modalADD.classList.remove("absolute")
    modalADD.classList.add("hidden")

})
// /=============================== edit modal ============================

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
        isExist:true,
        Attendence:[]
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
     <div class="cards w-[300px] h-[300px] border-2  bg-[#3498db] " style='padding-top:50px;'>
     <div class="img w-full h-[120px]  flex justify-center items-center">
        <div class="img_box  h-[100px] border-2 " style="width:100px; border-radius:100%; background-image:url('${data[i].file}') ;background-size: 100% 100%;"></div>
     </div>
     <div class="cards w-full h-[180px] ">
        <p class="text-2xl font-black pl-5 text-white">${data[i].name}</p>
        <p class="text-2xl font-black pl-5 text-white">${data[i].fatherName}</p>
        <p class="text-2xl font-black pl-5 text-white">${data[i].className}</p>
        
        <button style='margin-top:10px;' class="cursor-pointer text-2xl font-black  border-2 text-center mt-[46px] text-white" onclick="Delete('${data[i].id}')">Delete</button>
        <button style='margin-top:10px;' class="cursor-pointer text-2xl font-black  border-2 text-center mt-[46px] text-white" onclick="Attend('${data[i].id}')">Attend</button>
        <button id='edit' style='margin-top:10px;' class="cursor-pointer text-2xl font-black  border-2 text-center mt-[46px] text-white" onclick="EDIT('${data[i].id}')">EDIT</button>
        
     </div>
  </div>
     `
   }
}
window.check = function(){
    let ad = document.getElementById('ad')
    let popp = document.getElementById('popup')
    ad.classList.add("hidden")
    popp.classList.remove("hidden")
}
window.check1 = function(){
    let ad = document.getElementById('ad')
    let popp = document.getElementById('popup')
    ad.classList.add("hidden")
    popp.classList.remove("hidden")
}
var no 
window.jsFunction = function (val){


    if(val == 'leave' || val == 'absent'){
        check()
        check1()
    }
    console.log(val);
    no =  val
     
}

document.getElementById("close").addEventListener("click",()=>{
    let ad = document.getElementById('ad')
    let popp = document.getElementById('popup')
    ad.classList.remove("hidden")
    popp.classList.add("hidden")


})
document.getElementById("RollNmber").addEventListener("keydown",async (val)=>{

    console.log(val.key);

    if(val.key == "Enter"){
        console.log("Its Enter KEY");
    }


    let v = window.location.href
    let id = v.slice(v.indexOf('=')+1)


    let ROllNmber = document.getElementById("RollNmber").value

   let data =  await markAttendance(id,ROllNmber,no)

    for(let i =0;i<data.length;i++){

   let name = document.getElementById("name")
   let fatherName = document.getElementById("fatherName")
   let class_Name = document.getElementById("class_Name")

   name.innerHTML ='Name: '+ data[i].name
   fatherName.innerHTML ="Father Name:" + data[i].fatherName
   class_Name.innerHTML ="CLass Name: " + data[i].className
    }
})



window.Delete =async function (val){


 
    let v = window.location.href
    let id = v.slice(v.indexOf('=')+1)


    await deletestdent(id,val)
    swal({
        title: "Deleted Successfully !",
        text: "clicked the button! to continue",
        icon: "success",
      });
      
}


window.Attend = function (val){
    location.href = `./attend.html?=${val}`
}






// ================ update ==================================================
window.updateStdentDetail =  async function (event){
   event.preventDefault()


   let val =JSON.parse(localStorage.getItem("EDIT_ID"))

let name = document.getElementById("Name_").value
let class1 = document.getElementById("class_").value
let father = document.getElementById("father_").value
let contact = document.getElementById("Contact_").value
let cnic = document.getElementById("cnic_").value
let file = document.getElementById("file_").value



await update(contact,class1,cnic,father,name,file,val)

 }

// ========================================
// document.getElementById("rollNO").addEventListener("keydown",async (val)=>{

//     let v = window.location.href
//     let classID = v.slice(v.indexOf('=')+1)
//     let no = document.getElementById("rollNO").value

//    await getRealtimeData(no,classID)

// })




window.EDIT =async function (val){

    localStorage.setItem("EDIT_ID",JSON.stringify(val))

    let body  = document.getElementById("whole_body")
    body.classList.add("hidden")

    let modalADD  = document.getElementById("updateAdd")
    modalADD.classList.add("absolute")
    modalADD.classList.remove("hidden")



 

    

}


document.getElementById("hideEdit").addEventListener("click",()=>{

    let body  = document.getElementById("whole_body")
    body.classList.remove("hidden")

    let modalADD  = document.getElementById("updateAdd")
    modalADD.classList.remove("absolute")
    modalADD.classList.add("hidden")
})