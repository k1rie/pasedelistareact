import { useEffect } from "react"
import Navbar from "./componentes/navbar"
import Scanner from "./componentes/scanner"
import { useParams } from "react-router-dom"

function Scanear(){

    return(
        <div>
<Navbar/>
<Scanner/>
</div>
    )
}

export default Scanear