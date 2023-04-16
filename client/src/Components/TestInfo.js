
import { useState } from "react";
import "../Styles/testdd.css";

function TestInfo(props){
    const tests = props.tests;
    const testName = props.testName;
    const isDone = props.isDone;

    const[open, setOpen] = useState(false);

    function toggle() {
        setOpen(!open);
    }
    return(
        <div className="testInfo">
            <button className="dropdown" onClick={toggle}> 
            <a className="buttonText">
                <a className="testname">{testName}</a>
                <a className="arrow">
                {open
                ? <span class="fa-solid fa-angle-up fa-lg"/> 
                : <span class="fa-solid fa-angle-down fa-lg"/>
                }
                </a>
            </a>
             </button>
            {open && (
                <div className='content'> 
                    {tests.map((test) => (
                        <div className="test" key={test.id} >
                            <h2 className="testTitle">{test.title}</h2>
                            <pre className="testBody">{test.body}</pre>
                            <pre className="extraBody"dangerouslySetInnerHTML={{ __html: test.mit}} />
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