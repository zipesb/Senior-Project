
import { useState } from "react";
import "../Styles/testdd.css";

function TestInfo(props){
    const testName = props.testName;
    const[isListOpen, setIsListOpen] = useState(true);

    function handleClick() {
        setIsListOpen(!isListOpen);
    }

    return(
        <div>
            <button type="button" className="dd-header"
            onClick = {handleClick}
            >
            <a className="testname">{testName}</a>
            {isListOpen
            ? <span class="fa-solid fa-angle-up"/>
            : <span class="fa-solid fa-angle-down"/>
            }
            </button>
        </div>
    );
}

export default TestInfo;