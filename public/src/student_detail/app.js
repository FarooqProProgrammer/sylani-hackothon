import {getstudent} from '../config/firebase.js'

renderdetail()

async function renderdetail(){

    let data = await getstudent()

    // console.log(data);
    let body = document.getElementById("body")

        for(var i=0;i<data.length;i++){
            body.innerHTML += `
            
                    <tr>
                       <td>${i+1}</td>          
                    <td>${data[i].name}</td>
                    <td>${data[i].current_Section}</td>
                    <td>${data[i].transfer_Section}</td>
                </tr>

            `
        }

}