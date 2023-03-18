import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Styles/home.css";
import FileUpload from "./FileUpload";

function Home() {
    const [inputURL, setURL] = useState('');
    const navigate = useNavigate();
    const securityTest = () => {
        fetch('http://localhost:5000/server', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: inputURL })
        })
        .then(res => res.json())
        navigate("/report", {
            state: {
                url: inputURL
            }
        });
    };

    const [files, setFiles] = useState([{
        name: "myFile.pdf"
    }])

    function removeFile(filename) {
        setFiles(files.filter(file => file.name !== filename))
    }
    return (
        <div className="homestuff">
        <h1 className="title"> One-Stop Web Security </h1>
        <h2 className="blueteam"> By The <em>Blue</em> Team</h2>
        <input className="inputbox"
            type="text"
            placeholder="Website URL, Host Name, IP Address"
            value={inputURL}
            onChange={(e) => setURL(e.target.value)}
          />
          <button className="buttonstyle" type="submit" onClick={securityTest}> <a> Scan </a> </button> 
          <FileUpload files={files} setFiles={setFiles} removeFile={removeFile}/>
    </div>
    );
}



export default Home;