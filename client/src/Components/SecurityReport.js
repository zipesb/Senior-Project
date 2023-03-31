import { useLocation} from "react-router-dom";
import {useState} from "react";
import React, { useEffect } from 'react';
import "../Styles/report.css";
import TestInfo from "./TestInfo.js";
import Scan from "./Scan";

function SecurityReport() {
    const location = useLocation();

    // Test data from server goes here

    const[tests, setTests] = useState([]);
    
    var data = null;

    useEffect(() => {
        
        if(data === null) {
            data = getData();
        }
        
        data.then(value => {
            console.log(value);

            let brokenAccess = value[0];            
            for (let i = 0; i < brokenAccess.length; i++) {
                let category = 'Broken Access Control';
                let title = 'Test ' + (i+1);
                let body = brokenAccess[i];
                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id
                };
                setTests(tests => [...tests, json]);
            }

            let cryptFailures = value[1];            
            for (let i = 0; i < cryptFailures.length; i++) {
                let category = 'Cryptographic Failures';
                let title = 'Test ' + (i+1);
                let body = cryptFailures[i];
                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id
                };
                setTests(tests => [...tests, json]);
            }

            let injection = value[2];            
            for (let i = 0; i < injection.length; i++) {
                let category = 'Injection';
                let title = 'Test ' + (i+1);
                let body = injection[i];
                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id
                };
                setTests(tests => [...tests, json]);
            }

            let insecureDesign = value[3];            
            for (let i = 0; i < insecureDesign.length; i++) {
                let category = 'Insecure Design';
                let title = 'Test ' + (i+1);
                let body = insecureDesign[i];
                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id
                };
                setTests(tests => [...tests, json]);
            }

            let securityMisconf = value[4];            
            for (let i = 0; i < securityMisconf.length; i++) {
                let category = 'Security Misconfiguration';
                let title = 'Test ' + (i+1);
                let body = securityMisconf[i];
                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id
                };
                setTests(tests => [...tests, json]);
            }

            let outdatedComp = value[5];            
            for (let i = 0; i < outdatedComp.length; i++) {
                let category = 'Vulnerable and Outdated Components';
                let title = 'Test ' + (i+1);
                let body = outdatedComp[i];
                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id
                };
                setTests(tests => [...tests, json]);
            }

            let authFail = value[6];            
            for (let i = 0; i < authFail.length; i++) {
                let category = 'Identification and Authentication Failures';
                let title = 'Test ' + (i+1);
                let body = authFail[i];
                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id
                };
                setTests(tests => [...tests, json]);
            }

            let dataIntegrityFail = value[7];            
            for (let i = 0; i < dataIntegrityFail.length; i++) {
                let category = 'Software and Data Integrity Failures';
                let title = 'Test ' + (i+1);
                let body = dataIntegrityFail[i];
                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id
                };
                setTests(tests => [...tests, json]);
            }

            let loggingFail = value[8];            
            for (let i = 0; i < loggingFail.length; i++) {
                let category = 'Security Logging and Monitoring Failures';
                let title = 'Test ' + (i+1);
                let body = loggingFail[i];
                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id
                };
                setTests(tests => [...tests, json]);
            }

            let requestForg = value[9];            
            for (let i = 0; i < requestForg.length; i++) {
                let category = 'Server-Side Request Forgery';
                let title = 'Test ' + (i+1);
                let body = requestForg[i];
                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id
                };
                setTests(tests => [...tests, json]);
            }

            let misc = value[10];            
            for (let i = 0; i < misc.length; i++) {
                let category = 'Miscellaneous';
                let title = 'Test ' + (i+1);
                let body = misc[i];
                let id = i;
                let json = {
                    category: category,
                    title: title,
                    body: body,
                    id: id
                };
                setTests(tests => [...tests, json]);
            }
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

        <Scan/>

        <h2 className="vt">Vulnerability Tests</h2>

        <TestInfo testName="Broken Access Control" tests={bacTests}/>
        <TestInfo testName="Cryptographic Failures" tests={cfTests}/>
        <TestInfo testName="Injection" tests={inTests}/>
        <TestInfo testName="Insecure Design" tests={insecureTests}/>
        <TestInfo testName="Security Misconfiguration" tests={configTests}/>
        <TestInfo testName="Vulnerable and Outdated Components" tests={componentTests}/>
        <TestInfo testName="Identification and Authentication Failures" tests={authTests}/>
        <TestInfo testName="Software and Data Integrity Failures" tests={integriyTests}/>
        <TestInfo testName="Security Logging and Monitoring Failures" tests={loggingTests}/>
        <TestInfo testName="Server-Side Request Forgery" tests={forgeryTests}/>
        <TestInfo testName="Miscellaneous Vulnerabilities" tests={miscTests}/>
        
            
        </div>
    );
}

async function getData() {
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