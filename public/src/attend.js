import {get_Attend} from './config/firebase.js'




async function attendance(){
    let v = window.location.href
    let id = v.slice(v.indexOf('=')+1)

    let classID = JSON.parse(localStorage.getItem("id_classrom"))
    let data =await get_Attend(id,classID)
    console.log(data);

    let attend = document.getElementById("content")
    for(let i=0;i<data.length;i++){
      let time = new Date(data[i].time)
    attend.innerHTML+= 
    `
    <tr>
                    
    <td>${data[i].date}</td>
    <td>${data[i].attend}</td>
    <!--<td>${data[i].time}</td>-->
    <td>${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}</td>
  
  </tr>
    `
    }
    console.log(id);
}
attendance()