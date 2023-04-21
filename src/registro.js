import Navbar from "./componentes/navbar"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Registro(){

    const navigate = useNavigate()

    const [email, setEmail] = useState()

    const [nombres, setNombres] = useState()
    
    const [apellidos, setApellidos] = useState()
    
    const [password, setPassword] = useState()
    
    const [token, setToken] = useState()
    
useEffect(()=>{
  authtoken()  
},[])

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
     
function setcredentials(email, password){
    localStorage.setItem("email",email)
    localStorage.setItem("password",password)
 }


async function crearcuenta(){
        
   await fetch("https://attendance-api-production.up.railway.app/teachers/",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
        "email": email,
        "first_name": nombres,
        "last_name": apellidos,
        "password": password
    })
}).then((res) =>{return (res)
    if(res.ok === true){

    document.querySelector('.mensajeparaelprofe__container').style.display = "block"
        
    document.querySelector('.login').style.display = "none"
}}).then((data)=>data.json()).then((data)=>{;
navigate("/")

       
      
     
});


}

function crear(){

 
    crearcuenta()
}




return(
    
    <div>
<Navbar/>
<main>
        <div className="mensajeparaelprofe__container">
            <p className="mensajeparaelprofe__texto">Buenos dias profe :)</p>
        </div>
        <div className="login">
            <div className="login__texts">
<p>Crea tu usuario</p>
            </div>
    <div className="inputs__container">
 
                
<input type="text" onChange={(e)=>{setNombres(e.target.value)}} className="inputs firstname" placeholder="Nombres"/>
<input type="text" onChange={(e)=>{setApellidos(e.target.value)}} className="inputs secondname" placeholder="Apellidos"/>
<input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="inputs__email" placeholder="Email"/>
<input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="inputs__password" placeholder="Contraseña"/>
<button className="inputs__submit" onClick={crear}>Registrarse</button>

            
    </div>
        <Link to="/" class="login__registro">Login</Link>
        </div>
    </main>
    </div>
)
}

export default Registro