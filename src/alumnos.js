import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "./componentes/navbar";
import "./styles/normalize.css";
import "./styles/alumnos.css"
import Alumnosinfo from './componentes/alumnosinfo';

function Alumnos() {

    const reportelink = useRef()

    const { id } = useParams()

    const [fecha, setFecha] = useState("")
    const [email, setEmail] = useState("")
    const [nombres, setNombres] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [url, setUrl] = useState("")
    const [fechaarchivo, setFechaArchivo] = useState("")

    const [alumnos, setAlumnos] = useState([{ email: "", nombres: "", apellidos: "" }])


    const [data, setData] = useState({
        "email": "string",
        "first_name": "string",
        "last_name": "string",
        "classroom_id": 0
    })


    useEffect(() => {
        console.log(id)
        fetch(`https://attendance-api-production.up.railway.app/classrooms/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        }).then((response) => response.json()).then((data) => { console.log(data); setAlumnos(data.students.map((element) => { return { email: element.email, nombres: element.first_name, apellidos: element.last_name } })) })
    }, [])



    async function filldata() {
        console.log(email)

        await setData({
            "email": email,
            "first_name": nombres,
            "last_name": apellidos,
            "classroom_id": id
        })

        fetch("https://attendance-api-production.up.railway.app/students/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                "email": email,
                "first_name": nombres,
                "last_name": apellidos,
                "classroom_id": id
            })
        }).then(response => { if (response.ok === true) { return response.json() } }).then((response) => { console.log(response); setAlumnos([...alumnos, { email: response.email, nombres: response.first_name, apellidos: response.last_name }]) })
    }

    function hacerconsulta() {
        fetch(`https://attendance-api-production.up.railway.app/attendances/classrooms/${id}/start_date/${fecha}/end_date/${fecha}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        }).then((response) => { return response.json() }).then((response) => { setFechaArchivo(response.url); reportelink.current.style.display = "block" })
    }

    return (
        <div>
            <Navbar />

            <div class="grupos__boton">
                <div className='fecha__main'>
                    <a ref={reportelink} className='reportelink' href={fechaarchivo}>Reporte</a>
                    <input type="text" class="grupos__input" placeholder="Año-Mes-Dia" onChange={(e) => { setFecha(e.target.value) }} />
                    <button class="grupos__crear" onClick={hacerconsulta}  >Consultar</button>
                </div>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} class="grupos__input email" placeholder="Email" />
                <input type="text" onChange={(e) => { setNombres(e.target.value) }} class="grupos__input nombres" placeholder="Nombres" />
                <input type="text" onChange={(e) => { setApellidos(e.target.value) }} class="grupos__input apellidos" placeholder="Apellidos" />
                <button class="grupos__crear" onClick={() => filldata()}>Crear</button>
            </div>
            <div class="grupos__main">
                <div class="grupos__alumnos">
                    <div class="alumnos__info">
                        <p class="info__email">Email</p>
                        <p class="info__nombres">Nombres</p>
                        <p class="info__apellidos">Apellidos</p>
                    </div>
                </div>
            </div>
            {alumnos.map((alumnos) => { return (<Alumnosinfo email={alumnos.email} nombres={alumnos.nombres} apellidos={alumnos.apellidos} />) })}


        </div>
    )
}

export default Alumnos;