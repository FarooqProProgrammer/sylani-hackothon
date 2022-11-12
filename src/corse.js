import {addcourse} from './config/firebase.js'





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