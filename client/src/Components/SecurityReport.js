import { useLocation } from "react-router-dom"

function SecurityReport() {
    const location = useLocation();
    return (
        <div>
            <h1> Security Report </h1>
           Your Website URL: {location.state.url}
        </div>
    );
}

export default SecurityReport;