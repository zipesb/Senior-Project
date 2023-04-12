import axios from "axios";
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

        // this is where wfuzz is being called (call goes to endpoint in the backend that actually executes the wfuzz command)
        // CRITICAL: some of this is hardcoded for presentation 2 and will need to be adjusted
        // should eventually just pass the website name, all different wfuzz commands should be handled in the backend (e.g. pass website name to backend, backend runs a number of predetermined wfuzz commands with specific params)
        axios.get('http://localhost:5000/wfuzz', { params: { command: 'wsl wfuzz -z file,wordlists/paths.txt --hc 500 http://localhost:3001/FUZZ' } })
        .then((response) => {
          console.log(`stdout: ${response.data.output}`);
          console.log(`exit code: ${response.data.code}`);
        })
        .catch((error) => {
          console.error(error);
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