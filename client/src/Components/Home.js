import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Styles/home.css";
import axios from "axios";
import FileUpload from "./FileUpload";

function Home() {
    const [inputURL, setURL] = useState('');
    const [pressed, setPressed] = useState(false);
    const navigate = useNavigate();

    const securityTest = () => {

        // Give warning if scan button pressed before file uploaded
        if (file == null) {
            if (!pressed) { 
            setPressed(!pressed)
            }
            return
        }

        const formData = new FormData();
        formData.append ("file", file);

        axios.post('http://localhost:5000/upload', formData, {
            method: 'POST',
            headers: {
            'Content-Type': 'multipart/form-data'
            },
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err)
        });

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
        name: "myFile.zip"
    }])

    const [file, setFile] = useState(null);

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
        <h3 className="and">AND</h3>
        <FileUpload file={file} setFile={setFile}/>
        {pressed && <p class="ScanWarning">Upload a file before scanning</p>}  
        
    </div>
    );
}

export default Home;