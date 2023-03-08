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

var exec = require('child_process').exec;

async function run(dir) {
  const horusec = 'horusec.exe start -p "./' + dir + '" -D true';
  const unzip = 'tar -xf ' + dir + '.zip';

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

  const vulnArray = stdout.split('==================================================================================');
  vulnArray.pop();

  var low = [];
  var medium = [];
  var high = [];
  var critical = [];

  vulnArray.forEach((element) => {
    var vul = '';
    var index = element.indexOf('Severity: ') + 10;
    if (index == -1) {
      return;
    }
    let severity = element.substring(index, element.indexOf('\n', index));
    
    index = element.indexOf('Line:');
    var line = '';
    if (index != -1) {
      line = element.substring(index, element.indexOf('\n', index) + 1);
    }

    index = element.indexOf('File:');
    if (index == -1) {
      return;
    }
    let file = element.substring(index, element.indexOf('\n', index) + 1);

    index = element.indexOf('Code:');
    if (index == -1) {
      return;
    }
    let code = element.substring(index, element.indexOf('\n', index) + 1);

    index = element.indexOf('Details:');
    if (index == -1) {
      return;
    }
    let details = element.substring(index);

    index = details.indexOf('(https://cwe');
    var link = '';
    if (index != -1) {
      link = details.substring(index+1, details.indexOf(')', index));
      const axios = require('axios');

      axios.get(link)
        .then(response => {
          const { JSDOM } = require('jsdom');
          var html = response.data;

          var dom = new JSDOM(html);
          var document = dom.window.document;

          var html = document.getElementById('Potential_Mitigations');
          var data = html.textContent;

          var mits = data.split('            ');
          mits.shift();

          var mitigations = 'Potential Mitigations:\n\n';
          mits.forEach(mit => {
            
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

            const regex = /(?<=[a-z])[A-Z](?=[a-z])/;
            var newStr = mit.replace(regex, "\n$&");
            while(newStr !== mit) {
              mit = newStr;
              newStr = mit.replace(regex, "\n$&");
            }
            mitigations += mit + '\n';
          });
          mitigations += 'Link: ' + link;
          vul = 'Severity: ' + severity + '\n' + 'File: ' + file.substring(file.indexOf(dir)) + line + code 
                + details.substring(0, details.indexOf('For more information')) + '\n\n' + mitigations;

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
        });
    }
  });

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