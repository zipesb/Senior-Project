import { useLocation } from "react-router-dom"

function SecurityReport() {
    const location = useLocation();
    fetch('http://localhost:3000/report', {
      method: 'POST',
      body: location.state.url,
      headers: { 'Content-Type': 'test/html' }
    })
      .then(response => response.text())
      .then(text => console.log(text))
      .catch(error => console.error(error));

    return (
        <div>
            <h1> Security Report </h1>
           Your Website URL: {location.state.url}
        </div>
    );
}

export default SecurityReport;