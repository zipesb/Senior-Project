const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
//app.use(require("./routes/record"));
// get driver connection
//const dbo = require("./db/conn");

const wfuzzCommand = 'wfuzz -z file,wordlist/general/common.txt http://localhost:3000/FUZZ';

// Run commands within javascript
var exec = require('child_process').exec;


// Takes in the name of the .zip file inserted by user
// Statically tests the code and formats the outputs from Horusec
async function run(dir) {
  // Commands to be run
  const horusec = 'horusec.exe start -p "./' + dir + '" -D true';
  const unzip = 'tar -xf ' + dir + '.zip';

  // First, unzip the user-input file
  await new Promise((resolve, reject) => {
    exec(unzip, (error, stdout) => {
      if(error) {
        reject(error);
      }
      else {
        resolve(stdout);
      }
    });
  });

  // Static test the code in the zip file, format the results
  const { stdout } = await new Promise((resolve, reject) => {
    exec(horusec, (error, stdout, stderr) => {
      if(error) {
        reject(error);
      }
      else {
        resolve({stdout, stderr});
      }
    });
  });

  // Splitting up the threats into low, medium, high, and critical severity
  const vulnArray = stdout.split('==================================================================================');
  vulnArray.pop();

  var low = [];
  var medium = [];
  var high = [];
  var critical = [];

  // Begin vulnArray forEach loop
  vulnArray.forEach((element) => {
    // Picking through the information given by the output of Horusec
    var vul = '';

    // Getting the severity of the threat
    var index = element.indexOf('Severity: ') + 10;
    if (index == -1) {
      return;
    }
    let severity = element.substring(index, element.indexOf('\n', index));
    
    // Getting the line of code that the vulnerability lies
    index = element.indexOf('Line:');
    var line = '';
    if (index != -1) {
      line = element.substring(index, element.indexOf('\n', index) + 1);
    }

    // Getting the file where the vulnerability was found
    index = element.indexOf('File:');
    if (index == -1) {
      return;
    }
    let file = element.substring(index, element.indexOf('\n', index) + 1);

    // Getting a snippet of the code for what is causing the vulnerability
    index = element.indexOf('Code:');
    if (index == -1) {
      return;
    }
    let code = element.substring(index, element.indexOf('\n', index) + 1);

    // Getting the details about the vulnerability
    index = element.indexOf('Details:');
    if (index == -1) {
      return;
    }
    let details = element.substring(index);

    // Preparing to run an HTTP GET request to the linked cwe URL to grab the potential mitigations for the found vulnerability
    index = details.indexOf('(https://cwe');
    var link = '';
    if (index != -1) {
      // Getting the link, setting up the GET request
      link = details.substring(index+1, details.indexOf(')', index));
      const axios = require('axios');
      
      // Begin GET request
      axios.get(link)
        .then(response => {
          // Getting the html code from the URL
          const { JSDOM } = require('jsdom');
          var html = response.data;

          // Parsing the html code to turn it into text
          var dom = new JSDOM(html);
          var document = dom.window.document;

          // Only getting the text content from the "Potential Mitigations" section of the URL
          var html = document.getElementById('Potential_Mitigations');
          var data = html.textContent;

          // Formatting the text content to be readable
          var mits = data.split('            ');
          mits.shift();

          var mitigations = 'Potential Mitigations:\n\n';

          // Begin mits forEach loop
          mits.forEach(mit => {
            // Still formatting. This is creating new lines for each sub section
            mit = mit.replace('Policy ', 'Policy\n');
            mit = mit.replace('Requirements ', 'Requirements\n');
            mit = mit.replace('Architecture and Design ', 'Architecture and Design\n');
            mit = mit.replace('Implementation ', 'Implementation\n');
            mit = mit.replace('Build and Compilation ', 'Build and Compilation\n');
            mit = mit.replace('Testing ', 'Testing\n');
            mit = mit.replace('Documentation ', 'Documentation\n');
            mit = mit.replace('Bundling ', 'Bundling\n');
            mit = mit.replace('Distribution ', 'Distribution\n');
            mit = mit.replace('Installation ', 'Installation\n');
            mit = mit.replace('System Configuration ', 'System Configuration\n');
            mit = mit.replace('Operation ', 'Operation\n');
            mit = mit.replace('Patching and Maintenance ', 'Patching and Maintenance\n');
            mit = mit.replace('Porting ', 'Porting\n');

            // Even more formatting. This looks for any capital letter surrounded by 2 lower case letters, then inserts a new line
            const regex = /(?<=[a-z])[A-Z](?=[a-z])/;
            var newStr = mit.replace(regex, "\n$&");
            while(newStr !== mit) {
              mit = newStr;
              newStr = mit.replace(regex, "\n$&");
            }
            mitigations += mit + '\n';
          }); // End mits forEach loop

          // Attaching the link to the URL at the end of the mitigation techniques
          mitigations += 'Link: ' + link;

          // Combining all the information picked out from horusec
          vul = 'Severity: ' + severity + '\n' + 'File: ' + file.substring(file.indexOf(dir)) + line + code 
                + details.substring(0, details.indexOf('For more information')) + '\n\n' + mitigations;

          // Organizing the vulnerabilities by severity
          if(severity === 'LOW') {
            low.push(vul);
          }
          if(severity === 'MEDIUM') {
            medium.push(vul);
          }
          if(severity === 'HIGH') {
            high.push(vul);
          }
          if(severity === 'CRITICAL') {
            critical.push(vul);
          }

          // Logging everything
          console.log('LOW THREATS\n\n');
          low.forEach((element) => {
            console.log(element + '\n\n');
          });

          console.log('MEDIUM THREATS\n\n');
          medium.forEach((element) => {
            console.log(element + '\n\n');
          });

          console.log('HIGH THREATS\n\n');
          high.forEach((element) => {
            console.log(element + '\n\n');
          });

          console.log('CRITICAL THREATS\n\n');
          critical.forEach((element) => {
            console.log(element + '\n\n');
          });
        })
        .catch(error => {
          console.log(error);
        }); // End GET request
    }
  }); // End vulnArray forEach loop

  // Emptying the newly created directory from the unzip command
  await new Promise((resolve, reject) => {
    exec('del /f /s /q ' + dir, (error, stdout) => {
      if(error) {
        reject(error);
      }
      else {
        resolve(stdout);
      }
    });
  });

  // Fully removing the directory from the unzip command
  await new Promise((resolve, reject) => {
    exec('echo y|rmdir /s ' + dir, (error, stdout) => {
      if(error) {
        reject(error);
      }
      else {
        resolve(stdout);
      }
    });
  });
  
}

const dir = 'Herbboy-Dummy-Website';
run(dir);

/*
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});



app.post('/report', (req, res) => {
  //console.log("Message received: ", req);
  const data = req.body;
  console.log("Received: ", data);
  res.send("Received");
}); */