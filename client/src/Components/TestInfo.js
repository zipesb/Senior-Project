
import { useState } from "react";
import "../Styles/testdd.css";

function TestInfo(props){
    const tests = props.tests;
    const testName = props.testName;
    var isDone = props.isDone;

    const[open, setOpen] = useState(false);

    function toggle() {
        setOpen(!open);
    }
    return(
        <div>
            <button className="dropdown" onClick={toggle}> 
            <a className="testname">{testName}</a>
            {open
            ? <span className="fa-solid fa-angle-up fa-lg"/> 
            : <span className="fa-solid fa-angle-down fa-lg"/>
            }
             </button>
            {open && (
                <div className='content'> 
                    {tests.map((test) => (
                        <div className="test" key={test.id} style={{ whiteSpace: "pre-wrap", overflow: "hidden", wordWrap: "break-word", overflowWrap: "break-word" }}>
                            <h2>{test.title}</h2>
                            <pre>{test.body}</pre>
                        </div>
                    ))}
                    {tests.length === 0 && isDone && <h2>No Results</h2>}
                    {tests.length === 0 && !isDone && <h2>Loading...</h2>}
                </div>
            )}
            
        </div>
    );
}

export default TestInfo;