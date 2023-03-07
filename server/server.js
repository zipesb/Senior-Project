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


var exec = require('child_process').exec;

const wfuzzCommand = 'wfuzz -z file,wordlist/general/common.txt http://localhost:3000/FUZZ';
const dir = 'Herbboy-Dummy-Website';
const unzip = 'tar -xf ' + dir + '.zip';
const horusec = 'horusec.exe start -p "./' + dir + '" -D true';

exec(unzip, (error) => {
  if(error) {
    console.error(`exec error: ${error}`);
    return;
  }
});

exec(horusec, (error, stdout, stderr) => {
  if(error) {
    console.error(`exec error: ${error}`);
    return;
  }
  const vulnArray = stdout.split('==================================================================================');
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
//FIGURE OUT HOW TO ADD POTENTIAL MITIGATIONS TO THE OTHER SHIT
      axios.get(link)
        .then(response => {
          const { JSDOM } = require('jsdom');
          var html = response.data;

          var dom = new JSDOM(html);
          var document = dom.window.document;

          var data = document.body.textContent;

          let index = data.indexOf('Potential Mitigations');
          var mit = data.substring(index, data.indexOf('Memberships', index));
          //console.log(mit);
        })
        .catch(error => {
          console.log(error);
        });
    }

    vul = 'Severity: ' + severity + '\n' + 'File: ' + file.substring(file.indexOf(dir)) + line + code + details.substring(0, details.indexOf('For more information')) + '\nMore Information: ' + link;


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
    //console.log(severity);
  });

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

  //console.log(`stdout: ${stdout}`);
});


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