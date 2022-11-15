import {get_Attend} from './config/firebase.js'




async function attendance(){
    let v = window.location.href
    let id = v.slice(v.indexOf('=')+1)

    let classID = JSON.parse(localStorage.getItem("ClassID"))
    let data =await get_Attend(id,classID)
    console.log(data);

    let attend = document.getElementById("attend")
    for(let i=0;i<data.length;i++){
    attend.innerHTML+= 
    `
    <div style="width: 90%;" class="record h-[90%] border-2 border-black flex flex-col ">
    <div class="attendace w-[80%] h-[100px] border-2 flex justify-around items-center">
      <div style="width:	5.625rem;" class="date h-[100px] border-2 border-black text-2xl font-black text-center pt-5">${data[i].date}</div>
      <div style="width: 37.5rem;" class="atten h-[100px] border-2 border-black text-2xl font-black text-center pt-5">${data[i].attend}</div>
      <div style="width: 5.625rem;" class="titme  h-[100px] border-2 border-black text-2xl font-black text-center pt-5">${data[i].time}</div>
    </div>
</div>
    `
    }
    console.log(id);
}
// attendance()