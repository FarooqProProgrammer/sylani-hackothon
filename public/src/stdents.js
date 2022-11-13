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


window.update = function(){
    
    let body  = document.getElementById("whole_body")
   
    
    body.classList.add("hidden")

    let modalADD  = document.getElementById("updateAdd")
    modalADD.classList.add("absolute")
    modalADD.classList.remove("hidden")
    
}

document.getElementById("hidepdateModal").addEventListener("click",async ()=>{

    let body  = document.getElementById("whole_body")
   
    
    body.classList.remove("hidden")

    let modalADD  = document.getElementById("updateAdd")
    modalADD.classList.remove("absolute")
    modalADD.classList.add("hidden")


})

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
    let rool = name+generatePassword()

    await ADD_DATA(rool,id,collection)

    
}



showStdents()
async function showStdents(){
   let data = await getRealTimeStdents()


   let showStdents = document.getElementById("showStdents")

   for(let i = 0 ;i<data.length;i++){

     showStdents.innerHTML += 
     `
     <div class="profile_ui_cards w-[300px] h-[350px]  border-2 border-black mt-4">
        <div class="imge_card w-full h-[150px]  flex justify-center items-center">
            <div class="img w-[100px] h-[100px]  " >
                <img src='${data[i].file}' class='w-full h-full ronded-lg' />
            </div>

        </div>
        <div class="detailcard w-full h-[200px]  bg-[#3498db]">
            <p class="text-xl font-black ml-2 mt-2 text-white">Name: <span>${data[i].name}</span> </p>
            <p class="text-xl font-black ml-2 mt-2 text-white">Father Name: <span>${data[i].fatherName}</span></p>
            <p class="text-xl font-black ml-2 mt-2 text-white"> class: <span>${data[i].className}</span></p>
            <button class=" font-black ml-2 text-white mt-2 border-2 pl-5 pr-5" onclick="Delete('${data[i].id}')"> Delete </button>
            <button onclick="update()" class="border-2 pt-3 pb-3 pr-5 pl-5 bg-[#3498db] text-white">update</button>
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


 


    await deletestdent(id,val)
    swal({
        title: "Deleted Successfully !",
        text: "clicked the button! to continue",
        icon: "success",
      });
      id = ''
}









// ================ update ==================================================
function updateStdentDetail(event){
    event.preventDefault()
    let name = document.getElementById('Name').value
    let className = document.getElementById('class').value
    let father = document.getElementById('father').value
    let Roll = document.getElementById('Roll').value
    let Contact = document.getElementById('Contact').value
    let cnic = document.getElementById('cnic').value
    let file = document.getElementById('file').value

    
    update({})




}

// ========================================
document.getElementById("rollNO").addEventListener("keydown",async (val)=>{

    let v = window.location.href
    let classID = v.slice(v.indexOf('=')+1)
    let no = document.getElementById("rollNO").value

   await getRealtimeData(no,classID)

})