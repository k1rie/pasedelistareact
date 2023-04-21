import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Navbar from "./componentes/navbar"
import "./styles/inicio.css"


function Inicio(){

    const [data,setData] = useState()

    const [token,setToken] = useState()

    const [email,setEmail] = useState()

    const [password,setPassword] = useState()

    useEffect(()=>{
         authtoken()
  
    },[])

    function authenticate(){
            console.log(data)
       fetch("https://attendance-api-production.up.railway.app/accesses/login",{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
     }).then((response)=>{return response.json()}).then((data)=>{localStorage.setItem("token",data.token)})
     }

    async function authtoken(){
       await fetch("https://attendance-api-production.up.railway.app/accesses/login",{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: localStorage.getItem("email"), password: localStorage.getItem("password")})
         }).then((response)=>{return response.json()}).then((data)=>{localStorage.setItem("token",data.token);setToken(data.token);}).then((data)=>{ if (localStorage.getItem("token") != "undefined" && localStorage.getItem("token") === localStorage.getItem("token")){
            document.querySelector('.mensajeparaelprofe__container').style.display = "block"
        
            document.querySelector('.login').style.display = "none"
        }})


     }
     
     function setcredentials(){
        localStorage.setItem("email",email)
        localStorage.setItem("password",password)
     }

    async function allauth(){
        console.log(email)
        console.log(data)
        fetch("https://attendance-api-production.up.railway.app/accesses/login",{
         method: 'POST',
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({email: email, password: password})
      }).then((response)=>{return response.json()}).then((data)=>{localStorage.setItem("token",data.token); setcredentials() }).then((data)=>{if (localStorage.getItem("token") != "undefined" && localStorage.getItem("token") === localStorage.getItem("token")){
        document.querySelector('.mensajeparaelprofe__container').style.display = "block"
    
        document.querySelector('.login').style.display = "none"
        
    }})
      
     }


  
    return(
        <div>
        <Navbar/>
        <main>
        <div class="mensajeparaelprofe__container">
            <p class="mensajeparaelprofe__texto">Buenos dias profe :)</p>
        </div>
        <div class="login">

            <div class="login__texts">
<p>Crea tu usuario</p>
            </div>
 
 <div class="inputs__container">
                
<input type="text" onChange={(e)=>setEmail(e.target.value)} class="inputs email" placeholder="Email"/>
<input type="password" onChange={(e)=>setPassword(e.target.value)} class="inputs__password" placeholder="Contraseña"/>
<button class="inputs__submit"  onClick={allauth} >Login</button>

</div>       
        
        <Link to="/registro" class="login__registro">Registro</Link>
        </div>
    </main>
    </div>
    )
}

export default Inicio