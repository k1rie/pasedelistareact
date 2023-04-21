import { Link } from "react-router-dom";
import "../styles/card.css"

function Card(props){

    return(   
        <Link  to={props.link}> 
    <div class="grupos__card" id={props.id}  >
    <p class="card__title">{props.gruponombre}</p>
</div>
</Link>)
}

export default Card;