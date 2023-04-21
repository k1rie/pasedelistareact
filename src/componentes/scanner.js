import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/scanner.css"
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner() {


    const succesattended = useRef()

    const navigate = useNavigate()

    const [link, setLink] = useState()

    const { idclass, idalumno } = useParams()


    useEffect(() => {
        const scanner = new Html5QrcodeScanner('codigoqr__scan', {
            // Scanner will be initialized in DOM inside element with id of 'reader'
            qrbox: {
                width: 250,
                height: 250,
            },  // Sets dimensions of scanning box (set relative to reader element width)
            fps: 20, // Frames per second to attempt a scan


        }, []);





        scanner.render(success, error);
        // Starts scanner

        function success(result) {

            console.log(result)

            fetch(result, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then((response) => {if(response.ok === true){succesattended.current.style.display = 'block'}})




        }





        function error(err) {
            console.error(err);
            // Prints any errors to the console
        }




        var codigoqr = document.querySelector("#codigoqr__scan")



        codigoqr.style.border = "0px"

        console.log(codigoqr)
    }, [])


    return (
        <main>
            <div class="codigoqr">
                <div class="codigoqr__main">
                    <p class="codigoqr__text">Scanee el codigo QR</p>
                    <div id="codigoqr__scan" width="600px"></div>

                </div>
                <div ref={succesattended} className="succesattended">
                    <p>El alumno asistio</p>
                </div>
            </div>

        </main>
    )
}

export default Scanner