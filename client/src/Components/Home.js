import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function Home() {
    const [inputURL, setURL] = useState('');
    const navigate = useNavigate();
    const securityTest = (url) => {
        navigate("/report", {
            state: {
                url: inputURL
            }
        });
    };

    
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
          <button className="buttonstyle" onClick={securityTest}> <a> Scan </a> </button> 
    </div>
    );
}



export default Home;