import {SignIn} from './config/firebase.js'





window.login =async function (){
    let email = document.getElementById('email').value
    let password = document.getElementById('pass').value
    
    
    await SignIn(email,password)
    

}