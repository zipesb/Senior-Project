import { useLocation} from "react-router-dom";
import {useState} from "react";
import React, { useEffect } from 'react';
import "../Styles/report.css";
import TestInfo from "./TestInfo.js";
import Scan from "./Scan";

function SecurityReport() {
    const location = useLocation();

    // Test data from server goes here

    const[tests] = useState([
        {category: "Broken Access Control", title: "Test 1", body: "TEST INFO", id: 1},
        {category: "Broken Access Control", title: "Test 2", body: "TEST INFO", id: 2},
        {category: "Cryptographic Failures", title: "Test 3", body: "TEST INFO", id: 3},
        {category: "Cryptographic Failures", title: "Test 4", body: "TEST INFO", id: 4},
    ]);

    // Organize tests by category

    let bacTests = [];
    let cfTests = [];
    
    var data = null;

    useEffect(() => {
        
        if(data === null) {
            data = getData();
        }
        
        data.then(value => {
            console.log(value);
            cfTests = value[2];
        });

    }, [])
    
    for (let i=0; i<tests.length; i++) {
        if (tests[i].category === "Broken Access Control") {
            bacTests.push(tests[i]);
        }
        if (tests[i].category === "Cryptographic Failures") {
            cfTests.push(tests[i]);
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

        </div>
    );
}

async function getData() {
    var response = await fetch('http://localhost:5000/results');
    var data = await response.json();

    while(data === 'Loading') {
        await new Promise(resolve => setTimeout(resolve, 10000));
        console.log('Waiting...');
        response = await fetch('http://localhost:5000/results');
        data = await response.json();
    }
    return data;
}
  

export default SecurityReport;