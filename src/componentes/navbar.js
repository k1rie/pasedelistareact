import "../styles/navbar.css"
import "../styles/normalize.css"
import { Link } from "react-router-dom";

function Navbar(){

    function cerrarsesion(){
        localStorage.removeItem("email")
        localStorage.removeItem("password")
        localStorage.removeItem("token")
    }

return(
    <div className="navbar">
<Link to="/" className="navbar__link">Login</Link>
<Link to="/registro" className="navbar__link">Registro</Link>
<Link to="/scanear" className="navbar__link">Escaner</Link>
<Link to="/grupos" className="navbar__link">Grupos</Link>
<Link className="navbar__link" onClick={cerrarsesion}>Logout</Link>
</div>
)
}

export default Navbar