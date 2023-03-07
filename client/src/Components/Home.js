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
        <div>
            <h2> Input a URL</h2>
            <input
                type="text"
                placeholder="Website URL"
                value={inputURL}
                onChange={(e) => setURL(e.target.value)}
              />
            <button onClick={securityTest}> Enter </button> 
        </div>
    );
}


export default Home;