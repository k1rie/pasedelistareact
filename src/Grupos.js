import { useEffect, useState } from "react";
import Navbar from "./componentes/navbar";
import "./styles/grupos.css"
import Card from "./componentes/card";



function Grupos(idd) {

    const [groupName, setGroupName] = useState("");

    const [groups, setGroups] = useState([])

    const [idgrupo, setIdgrupo] = useState("")




    const [nuevo, setNuevo] = useState()

    const [salones, setSalones] = useState([])


    const [data, setData] = useState()


    useEffect(() => { getsalones() }, [])

    async function getsalones() {
        await fetch("https://attendance-api-production.up.railway.app/accesses/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({   
            "email": localStorage.getItem("email"),
            "password": localStorage.getItem("password") })
        }).then((response) => { if(response.ok === true) {fetch("https://attendance-api-production.up.railway.app/classrooms/", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => { return response.json() }).then((data) => {
            console.log(data)
            setGroups(data)


        })}})




      

    }






    console.log(localStorage.getItem("token"))

    async function crearsalon() {
        console.log(data)
        await fetch("https://attendance-api-production.up.railway.app/classrooms/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ "name": groupName.name })
        }).then((response) => { return response.json() }).then((response) => {
            console.log(response)
            setGroups([...groups, response])
        })




    }


    async function llamadasalon() {

        await setData({ "name": document.querySelector(".grupos__input").value })
        console.log(salones)
        crearsalon()
    }




    async function manejarinput(e) {
        setGroupName({ name: e.target.value })
        setData({ "name": groupName.name })
    }






    return (
        <div>
            <Navbar />


            <div class="grupos__boton" id ="gruposboton">
                <input type="text" className="grupos__input" id="gruposinput" onChange={(e) => { console.log(e.target.value)  ;      setGroupName({ name: e.target.value })
        setData({ "name": groupName.name }) }} />
                <button className="grupos__crear" onClick={crearsalon}>Crear</button>
            </div>
            <div className="grupos__main">
                {groups.map((element) => { return (<div><Card link={`/grupos/alumnos/${element.id}`} id={element.id} gruponombre={element.name}/></div>) })}
            </div>

        </div>
    )
}

export default Grupos;