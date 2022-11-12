import {addcourse,getRealtime} from './config/firebase.js'





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
getClass()  
async function getClass(){
    let cities = await getRealtime()
    let showclass = document.getElementById("showclass")
    showclass.innerHTML = ''
    for(let i =0;i<cities.length;i++){
      console.log(cities[i].id);
      showclass.innerHTML += `
      <div class="class_1 w-[90%] h-[100px] border-2 border-black mt-5 flex justify-arond items-center pl-5 pr-5">

      <div class="sno w-[100px] h-[70px] border-2 border-black text-center pt-5">${cities[i].SectionName}</div>
      <div class="name w-[300px] h-[70px] border-2 border-black text-center pt-5">${cities[i].teachers_name}</div>
      <div class="view w-[100px] h-[70px] border-2 border-black">

         <button class="w-full h-[100%] border-2 border-black" onclick="gotoClass('${cities[i].id}')">View</button>

      </div>
      

   </div>
      `
      

    }

}