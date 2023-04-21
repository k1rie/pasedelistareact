import "../styles/alumnosinfo.css"

function Alumnosinfo(props){
    return(
<div class="grupos__alumno">
<p class="alumno__email">{props.email}</p>
<p class="alumno__nombres">{props.nombres}</p>
<p class="alumno__apellidos">{props.apellidos}</p>
</div>
    )
}

export default Alumnosinfo