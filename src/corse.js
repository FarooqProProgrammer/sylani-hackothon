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


window.addclassDetail = function(){

    let clasName = document.getElementById("Name").vae

}