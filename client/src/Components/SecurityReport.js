import { useLocation } from "react-router-dom"
import "../Styles/report.css";
import TestInfo from "./TestInfo.js"

function SecurityReport() {
    const location = useLocation();
    return (
        <div>
            <div className="r1">
            <h1> Security Report </h1>
            <h2>{location.state.url} </h2>
            </div>
            <h3 className="ss">Scan Summary</h3>
            <div className="scan">
            <p className="sp1">Scan Duration<br></br><em id="em1">5 min, 3 sec</em></p>   
            <p className="sp2">Tests Performed<br></br><em id="em1">10/10</em></p>
            <p className="sp3">Scan Status<br></br><em id="em1">Finished</em></p>
            </div>
            <br></br>
            <br></br>
        <hr></hr>

        <h2 className="vt">Vulnerability Tests</h2>

        <TestInfo testName="Broken Access Control"/>
        <TestInfo testName="Cryptographic Failure"/>

        </div>
    );
}

export default SecurityReport;