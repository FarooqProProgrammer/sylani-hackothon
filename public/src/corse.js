import {
    addcourse,
    getRealtime,
    deleteClass,
    updateModel,
    updateclass
} from './config/firebase.js'





window.Add = function (){

    let body  = document.getElementById("whole_body")
   
    
    body.classList.add("hidden")

    let modalADD  = document.getElementById("modalAdd")
    modalADD.classList.add("absolute")
    modalADD.classList.remove("hidden")

    
}
// ========================== delete modal ========================================
document.getElementById("delete").addEventListener("click", ()=>{
    let body  = document.getElementById("whole_body")
   
    
    body.classList.add("hidden")

    let modalADD  = document.getElementById("deleteModal")
    modalADD.classList.add("absolute")
    modalADD.classList.remove("hidden")
})
document.getElementById("HidedeleteModal").addEventListener("click", ()=>{
    let body  = document.getElementById("whole_body")
   
    
    body.classList.remove("hidden")

    let modalADD  = document.getElementById("deleteModal")
    modalADD.classList.remove("absolute")
    modalADD.classList.add("hidden")
})


document.getElementById("DELETECLASS").addEventListener("click",async ()=>{

    let id = document.getElementById("deleteInput").value
    id = ''
    await deleteClass(id)
    swal({
        title: "Deleted Successfully !",
        text: "clicked the button! to continue",
        icon: "success",
      });
      id = ''
      
})
// ========================== delete modal ========================================

document.getElementById('hideModal').addEventListener("click",()=>{

    let body  = document.getElementById("whole_body")
   
    
    body.classList.remove("hidden")

    let modalADD  = document.getElementById("modalAdd")
    modalADD.classList.remove("absolute")
    modalADD.classList.add("hidden")

})


window.addclassDetail =async function(e){
    e.preventDefault()
    let clasName = document.getElementById("Name").value
    let clastiming = document.getElementById("cm").value
    let shedle = document.getElementById("shc").value
    let teachersName = document.getElementById("tn").value
    let SectionName = document.getElementById("sn").value
    let corseName = document.getElementById("cname").value
    let batchNamber = document.getElementById("bn").value
   


    await addcourse(clasName,{clastiming,shedle,teachersName,SectionName,corseName,batchNamber})
    

}
getClass()  
async function getClass(){
    let cities = await getRealtime()
    let showclass = document.getElementById("showclass")
    showclass.innerHTML = ''
    for(let i =0;i<cities.length;i++){
      console.log(cities[i].id);
      showclass.innerHTML += `
      <tr>
            
      <td>${cities[i].SectionName}</td>
      <td>${cities[i].teachers_name}</td>
      <td><button type="button" class="btn btn-primary text-warning" onclick="gotoClass('${cities[i].id}')" >View</button></td>
      <td><button type="button" class="btn btn-primary text-warning" onclick="Update1('${cities[i].id}')" >Update</button></td>
      
    </tr>
      `
      

    }

}



// ===================== goto classs =================================
window.gotoClass = function (val){

    localStorage.setItem("id_classrom",JSON.stringify(val))
    location.href = `./index3.html?=${val}`


}

function openUpdate(){
    let body  = document.getElementById("whole_body")
   
    
    body.classList.add("hidden")

    let modalADD  = document.getElementById("update")
    modalADD.classList.add("absolute")
    modalADD.classList.remove("hidden")
}


window.hideupdate =  function (){
    let body  = document.getElementById("whole_body")
   
    
    body.classList.remove("hidden")

    let modalADD  = document.getElementById("update")
    modalADD.classList.remove("absolute")
    modalADD.classList.add("hidden")
}
window.Update1  =async  function (val){
    console.log(val);
    openUpdate()

    let data = await updateModel()


    let flag = false
    for(let i=0;i<data.length;i++){
        if(data[i].id == val){
            console.log('Found '+data[i].id);
            flag = true

            let section = document.getElementById("section").value
            let batch = document.getElementById("batch").value
            let time = document.getElementById("classTime").value
            let schedule = document.getElementById("classSchedule").value
            let teacher = document.getElementById("TeacherName").value
            
            section = data[i].SectionName
            batch = data[i].batch_nmber
            time = data[i].classtiming
            schedule = data[i].scheduleOfClass
            teacher = data[i].teachers_name

            openUpdate()



            await  updateclass ({section,batch,time,schedule,teacher})

            

        }
    }


}