
import { useState } from "react";
import "../Styles/testdd.css";

function TestInfo(props){
    const tests = props.tests;
    const testName = props.testName;

    const[open, setOpen] = useState(false);

    function toggle() {
        setOpen(!open);
    }

    return(
        <div>
            <button className="dropdown" onClick={toggle}> 
            <a className="testname">{testName}</a>
            {open
            ? <span class="fa-solid fa-angle-up fa-lg"/> 
            : <span class="fa-solid fa-angle-down fa-lg"/>
            }
             </button>
            {open && (
                <div className='content'> 
                    {tests.map((test) => (
                        <div className="test" key={test.id}>
                            <h2>{test.title}</h2>
                            <p>{test.body}</p>
                        </div>
                    ))} 
                </div>
            )}
            
        </div>
    );
}

export default TestInfo;