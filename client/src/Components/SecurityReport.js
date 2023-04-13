import { useLocation} from "react-router-dom";
import {useState} from "react";
import React, { useEffect } from 'react';
import "../Styles/report.css";
import TestInfo from "./TestInfo.js";
import Scan from "./Scan";

function SecurityReport() {
    const location = useLocation();

    // Test data from server goes here

    const [tests, setTests] = useState([]);
    const [done, setDone] = useState(false);
    const [time, setTime] = useState(0);
    const [count, setCount] = useState(0);
    
    var data = null;

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(time => time + 1);
        }, 1000);

        if(data === null) {
            data = getData(time, setTime);
        }
        
        data.then(value => {
            console.log(value);

            const regex = /<a.*?>|<\/a>/g;
            const regex2 = /<p><\/p>/g;
            const regex3 = /<div class="indent"> <\/div>/g;

            let brokenAccess = value[0];            
            for (let i = 0; i < brokenAccess.length; i++) {
                let category = 'Broken Access Control';
                let title = 'Test ' + (i+1);
                let contents = brokenAccess[i];
                let body = contents.substring(0, contents.indexOf('<table'));
                let mit = '';
                if(contents.indexOf('<table') > 0) {
                    mit = contents.substring(contents.indexOf('<table'), contents.indexOf('</table>') + 8);
                }
                mit = mit.replace(regex, "");
                mit = mit.replace(regex2, "");
                mit = mit.replace(regex3, "");

                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id,
                    mit: mit
                };
                setTests(tests => [...tests, json]);
                setCount((count) => count + 1);
            }

            let cryptFailures = value[1];            
            for (let i = 0; i < cryptFailures.length; i++) {
                let category = 'Cryptographic Failures';
                let title = 'Test ' + (i+1);
                let contents = cryptFailures[i];
                let body = contents.substring(0, contents.indexOf('<table'))
                let mit = '';
                if(contents.indexOf('<table') > 0) {
                    mit = contents.substring(contents.indexOf('<table'), contents.indexOf('</table>') + 8);
                }
                mit = mit.replace(regex, "");
                mit = mit.replace(regex2, "");
                mit = mit.replace(regex3, "");

                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id,
                    mit: mit
                };
                setTests(tests => [...tests, json]);
                setCount((count) => count + 1);
            }

            let injection = value[2];            
            for (let i = 0; i < injection.length; i++) {
                let category = 'Injection';
                let title = 'Test ' + (i+1);
                let contents = injection[i];
                let body = contents.substring(0, contents.indexOf('<table'));
                let mit = '';
                if(contents.indexOf('<table') > 0) {
                    mit = contents.substring(contents.indexOf('<table'), contents.indexOf('</table>') + 8);
                }
                mit = mit.replace(regex, "");
                mit = mit.replace(regex2, "");
                mit = mit.replace(regex3, "");

                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id,
                    mit: mit
                };
                setTests(tests => [...tests, json]);
                setCount((count) => count + 1);
            }

            let insecureDesign = value[3];            
            for (let i = 0; i < insecureDesign.length; i++) {
                let category = 'Insecure Design';
                let title = 'Test ' + (i+1);
                let contents = insecureDesign[i];
                let body = contents.substring(0, contents.indexOf('<table'));
                let mit = '';
                if(contents.indexOf('<table') > 0) {
                    mit = contents.substring(contents.indexOf('<table'), contents.indexOf('</table>') + 8);
                }
                mit = mit.replace(regex, "");
                mit = mit.replace(regex2, "");
                mit = mit.replace(regex3, "");

                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id,
                    mit: mit
                };
                setTests(tests => [...tests, json]);
                setCount((count) => count + 1);
            }

            let securityMisconf = value[4];            
            for (let i = 0; i < securityMisconf.length; i++) {
                let category = 'Security Misconfiguration';
                let title = 'Test ' + (i+1);
                let contents = securityMisconf[i];
                let body = contents.substring(0, contents.indexOf('<table'))
                let mit = '';
                if(contents.indexOf('<table') > 0) {
                    mit = contents.substring(contents.indexOf('<table'), contents.indexOf('</table>') + 8);
                }
                mit = mit.replace(regex, "");
                mit = mit.replace(regex2, "");
                mit = mit.replace(regex3, "");

                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id,
                    mit: mit
                };
                setTests(tests => [...tests, json]);
                setCount((count) => count + 1);
            }

            let outdatedComp = value[5];            
            for (let i = 0; i < outdatedComp.length; i++) {
                let category = 'Vulnerable and Outdated Components';
                let title = 'Test ' + (i+1);
                let contents = outdatedComp[i];
                let body = contents.substring(0, contents.indexOf('<table'))
                let mit = '';
                if(contents.indexOf('<table') > 0) {
                    mit = contents.substring(contents.indexOf('<table'), contents.indexOf('</table>') + 8);
                }
                mit = mit.replace(regex, "");
                mit = mit.replace(regex2, "");
                mit = mit.replace(regex3, "");

                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id,
                    mit: mit
                };
                setTests(tests => [...tests, json]);
                setCount((count) => count + 1);
            }

            let authFail = value[6];            
            for (let i = 0; i < authFail.length; i++) {
                let category = 'Identification and Authentication Failures';
                let title = 'Test ' + (i+1);
                let contents = authFail[i];
                let body = contents.substring(0, contents.indexOf('<table'))
                let mit = '';
                if(contents.indexOf('<table') > 0) {
                    mit = contents.substring(contents.indexOf('<table'), contents.indexOf('</table>') + 8);
                }
                mit = mit.replace(regex, "");
                mit = mit.replace(regex2, "");
                mit = mit.replace(regex3, "");

                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id,
                    mit: mit
                };
                setTests(tests => [...tests, json]);
                setCount((count) => count + 1);
            }

            let dataIntegrityFail = value[7];            
            for (let i = 0; i < dataIntegrityFail.length; i++) {
                let category = 'Software and Data Integrity Failures';
                let title = 'Test ' + (i+1);
                let contents = dataIntegrityFail[i];
                let body = contents.substring(0, contents.indexOf('<table'))
                let mit = '';
                if(contents.indexOf('<table') > 0) {
                    mit = contents.substring(contents.indexOf('<table'), contents.indexOf('</table>') + 8);
                }
                mit = mit.replace(regex, "");
                mit = mit.replace(regex2, "");
                mit = mit.replace(regex3, "");

                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id,
                    mit: mit
                };
                setTests(tests => [...tests, json]);
                setCount((count) => count + 1);
            }

            let loggingFail = value[8];            
            for (let i = 0; i < loggingFail.length; i++) {
                let category = 'Security Logging and Monitoring Failures';
                let title = 'Test ' + (i+1);
                let contents = loggingFail[i];
                let body = contents.substring(0, contents.indexOf('<table'))
                let mit = '';
                if(contents.indexOf('<table') > 0) {
                    mit = contents.substring(contents.indexOf('<table'), contents.indexOf('</table>') + 8);
                }
                mit = mit.replace(regex, "");
                mit = mit.replace(regex2, "");
                mit = mit.replace(regex3, "");

                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id,
                    mit: mit
                };
                setTests(tests => [...tests, json]);
                setCount((count) => count + 1);
            }

            let requestForg = value[9];            
            for (let i = 0; i < requestForg.length; i++) {
                let category = 'Server-Side Request Forgery';
                let title = 'Test ' + (i+1);
                let contents = requestForg[i];
                let body = contents.substring(0, contents.indexOf('<table'))
                let mit = '';
                if(contents.indexOf('<table') > 0) {
                    mit = contents.substring(contents.indexOf('<table'), contents.indexOf('</table>') + 8);
                }
                mit = mit.replace(regex, "");
                mit = mit.replace(regex2, "");
                mit = mit.replace(regex3, "");

                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id,
                    mit: mit
                };
                setTests(tests => [...tests, json]);
                setCount((count) => count + 1);
            }

            let misc = value[10];            
            for (let i = 0; i < misc.length; i++) {
                let category = 'Miscellaneous';
                let title = 'Test ' + (i+1);
                let contents = misc[i];
                let body = contents.substring(0, contents.indexOf('<table'))
                let mit = '';
                if(contents.indexOf('<table') > 0) {
                    mit = contents.substring(contents.indexOf('<table'), contents.indexOf('</table>') + 8);
                }
                mit = mit.replace(regex, "");
                mit = mit.replace(regex2, "");
                mit = mit.replace(regex3, "");

                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id,
                    mit: mit
                };
                setTests(tests => [...tests, json]);
                setCount((count) => count + 1);
            }

            setDone(true);
            clearInterval(timer);
        });
    }, []);


    // Organize tests by category

    let bacTests = [];
    let cfTests = [];
    let inTests = [];
    let insecureTests = [];
    let configTests = [];
    let componentTests = [];
    let authTests = [];
    let integriyTests = [];
    let loggingTests = [];
    let forgeryTests = [];
    let miscTests = [];

    for (let i=0; i<tests.length; i++) {
        if (tests[i].category === "Broken Access Control") {
            bacTests.push(tests[i]);
        }
        if (tests[i].category === "Cryptographic Failures") {
            cfTests.push(tests[i]);
        }
        if(tests[i].category === 'Injection') {
            inTests.push(tests[i]);
        }
        if(tests[i].category === 'Insecure Design') {
            insecureTests.push(tests[i]);
        }
        if(tests[i].category === 'Security Misconfiguration') {
            configTests.push(tests[i]);
        }
        if(tests[i].category === 'Vulnerable and Outdated Components') {
            componentTests.push(tests[i]);
        }
        if(tests[i].category === 'Identification and Authentication Failures') {
            authTests.push(tests[i]);
        }
        if(tests[i].category === 'Software and Data Integrity Failures') {
            integriyTests.push(tests[i]);
        }
        if(tests[i].category === 'Security Logging and Monitoring Failures') {
            loggingTests.push(tests[i]);
        }
        if(tests[i].category === 'Server-Side Request Forgery') {
            forgeryTests.push(tests[i]);
        }
        if(tests[i].category === 'Miscellaneous') {
            miscTests.push(tests[i]);
        }

    }

    
    return (
        <div>
            <div className="r1">
            <h1> Security Report </h1>
            <h2>{location.state.url} </h2>
        </div>

        <Scan time={time} isDone={done} count={count}/>

        <h2 className="vt">Vulnerability Tests</h2>

        <TestInfo testName="Broken Access Control" tests={bacTests} isDone={done}/>
        <TestInfo testName="Cryptographic Failures" tests={cfTests} isDone={done}/>
        <TestInfo testName="Injection" tests={inTests} isDone={done}/>
        <TestInfo testName="Insecure Design" tests={insecureTests} isDone={done}/>
        <TestInfo testName="Security Misconfiguration" tests={configTests} isDone={done}/>
        <TestInfo testName="Vulnerable and Outdated Components" tests={componentTests} isDone={done}/>
        <TestInfo testName="Identification and Authentication Failures" tests={authTests} isDone={done}/>
        <TestInfo testName="Software and Data Integrity Failures" tests={integriyTests} isDone={done}/>
        <TestInfo testName="Security Logging and Monitoring Failures" tests={loggingTests} isDone={done}/>
        <TestInfo testName="Server-Side Request Forgery" tests={forgeryTests} isDone={done}/>
        <TestInfo testName="Miscellaneous Vulnerabilities" tests={miscTests} isDone={done}/>
        
            
        </div>
    );
}

async function getData(time, setTime) {
    var response = await fetch('http://localhost:5000/results');
    var data = await response.json();
    while(data === 'Loading') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Waiting...');
        response = await fetch('http://localhost:5000/results');
        data = await response.json();
    }
    return data;
}
  

export default SecurityReport;