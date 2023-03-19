
const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//const uploadRoutes = require('./upload');

//app.use(require("./routes/record"));

// get driver connection

const dbo = require("./db/conn");

//app.use('/upload', uploadRoutes);

app.post('/server', (req, res) => {
  const message = req.body.message;
  res.json(`Received URL: ${message}`);
  //console.log(message);
})

const multer = require("multer");
const { stat } = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

var staticData = 'Loading';
app.post('/upload', upload.single("file"), async (req, res) => {
  const file = req.file;
  var dir = file.filename;
  dir = dir.substring(0, dir.indexOf('.'));
  staticData = await getStaticResult(dir);


  res.json(`Received File: ${dir}`);
});

app.get('/results', (req, res) => {
  res.send(JSON.stringify(staticData));
  staticData = 'Loading';
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


async function getStaticResult(dir) {
  var data = await staticTest(dir);
  return data;
}


// Run commands within javascript
var exec = require('child_process').exec;

// Takes in the name of the .zip file inserted by user
// Statically tests the code and formats the outputs from Horusec
async function staticTest(dir) {
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

  // Organizing the vulnerabilities by OWASP top 10
  var brokenAccess = [];
  var cryptFailures = [];
  var injection = [];
  var insecureDesign = [];
  var securityMisconf = [];
  var outdatedComp = [];
  var authFail = [];
  var dataIntegrityFail = [];
  var loggingFail = [];
  var requestForg = [];
  var misc = [];

  // Begin vulnArray forEach loop
  await new Promise((resolve, reject) => {
    vulnArray.forEach(async (element) => {
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
      var mitigations = await getMits(link);

      // Combining all the information picked out from horusec
      vul = 'Severity: ' + severity + '\n\n' + 'File: ' + file.substring(file.indexOf(dir)) + '\n' + line + '\n' + code + '\n'
           + details.substring(0, details.indexOf('For more information')) + '\n\n' + mitigations;

      // Getting vulnerability number
      const num = parseInt(link.substring(link.lastIndexOf('/') + 1, link.lastIndexOf('.')));

      // Organizing vulnerabilities (described by OWASP)
      switch(num) {
            case 1345:
              brokenAccess.push(vul);
              break;
            case 22:
              brokenAccess.push(vul);
              break;
            case 23:
              brokenAccess.push(vul);
              break;
            case 35:
              brokenAccess.push(vul);
              break;
            case 59:
              brokenAccess.push(vul);
              break;
            case 200:
              brokenAccess.push(vul);
              break;
            case 201:
              brokenAccess.push(vul);
              break;
            case 219:
              brokenAccess.push(vul);
              break;
            case 264:
              brokenAccess.push(vul);
              break;
            case 275:
              brokenAccess.push(vul);
              break;
            case 276:
              brokenAccess.push(vul);
              break;
            case 284:
              brokenAccess.push(vul);
              break;
            case 285:
              brokenAccess.push(vul);
              break;
            case 352:
              brokenAccess.push(vul);
              break;
            case 359:
              brokenAccess.push(vul);
              break;
            case 377:
              brokenAccess.push(vul);
              break;
            case 402:
              brokenAccess.push(vul);
              break;
            case 425:
              brokenAccess.push(vul);
              break;
            case 441:
              brokenAccess.push(vul);
              break;
            case 497:
              brokenAccess.push(vul);
              break;
            case 538:
              brokenAccess.push(vul);
              break;
            case 540:
              brokenAccess.push(vul);
              break;
            case 548:
              brokenAccess.push(vul);
              break;
            case 552:
              brokenAccess.push(vul);
              break;
            case 566:
              brokenAccess.push(vul);
              break;
            case 601:
              brokenAccess.push(vul);
              break;
            case 639:
              brokenAccess.push(vul);
              break;
            case 651:
              brokenAccess.push(vul);
              break;
            case 668:
              brokenAccess.push(vul);
              break;
            case 706:
              brokenAccess.push(vul);
              break;
            case 862:
              brokenAccess.push(vul);
              break;
            case 863:
              brokenAccess.push(vul);
              break;
            case 913:
              brokenAccess.push(vul);
              break;
            case 922:
              brokenAccess.push(vul);
              break;
            case 1275:
              brokenAccess.push(vul);
              break;
            case 1346:
              cryptFailures.push(vul);
              break;
            case 261:
              cryptFailures.push(vul);
              break;
            case 296:
              cryptFailures.push(vul);
              break;
            case 310:
              cryptFailures.push(vul);
              break;
            case 319:
              cryptFailures.push(vul);
              break;
            case 321:
              cryptFailures.push(vul);
              break;
            case 322:
              cryptFailures.push(vul);
              break;
            case 323:
              cryptFailures.push(vul);
              break;
            case 324:
              cryptFailures.push(vul);
              break;
            case 325:
              cryptFailures.push(vul);
              break;
            case 326:
              cryptFailures.push(vul);
              break;
            case 327:
              cryptFailures.push(vul);
              break;
            case 328:
              cryptFailures.push(vul);
              break;
            case 329:
              cryptFailures.push(vul);
              break;
            case 330:
              cryptFailures.push(vul);
              break;
            case 331:
              cryptFailures.push(vul);
              break;
            case 335:
              cryptFailures.push(vul);
              break;
            case 336:
              cryptFailures.push(vul);
              break;
            case 337:
              cryptFailures.push(vul);
              break;
            case 338:
              cryptFailures.push(vul);
              break;
            case 340:
              cryptFailures.push(vul);
              break;
            case 347:
              cryptFailures.push(vul);
              break;
            case 523:
              cryptFailures.push(vul);
              break;
            case 720:
              cryptFailures.push(vul);
              break;
            case 757:
              cryptFailures.push(vul);
              break;
            case 759:
              cryptFailures.push(vul);
              break;
            case 760:
              cryptFailures.push(vul);
              break;
            case 780:
              cryptFailures.push(vul);
              break;
            case 818:
              cryptFailures.push(vul);
              break;
            case 916:
              cryptFailures.push(vul);
              break;
            case 1347:
              injection.push(vul);
              break;
            case 20:
              injection.push(vul);
              break;
            case 74:
              injection.push(vul);
              break;
            case 75:
              injection.push(vul);
              break;
            case 77:
              injection.push(vul);
              break;
            case 78:
              injection.push(vul);
              break;
            case 79:
              injection.push(vul);
              break;
            case 80:
              injection.push(vul);
              break;
            case 83:
              injection.push(vul);
              break;
            case 87:
              injection.push(vul);
              break;
            case 88:
              injection.push(vul);
              break;
            case 89:
              injection.push(vul);
              break;
            case 90:
              injection.push(vul);
              break;
            case 91:
              injection.push(vul);
              break;
            case 93:
              injection.push(vul);
              break;
            case 94:
              injection.push(vul);
              break;
            case 95:
              injection.push(vul);
              break;
            case 96:
              injection.push(vul);
              break;
            case 97:
              injection.push(vul);
              break;
            case 98:
              injection.push(vul);
              break;
            case 99:
              injection.push(vul);
              break;
            case 113:
              injection.push(vul);
              break;
            case 116:
              injection.push(vul);
              break;
            case 138:
              injection.push(vul);
              break;
            case 184:
              injection.push(vul);
              break;
            case 470:
              injection.push(vul);
              break;
            case 471:
              injection.push(vul);
              break;
            case 564:
              injection.push(vul);
              break;
            case 610:
              injection.push(vul);
              break;
            case 643:
              injection.push(vul);
              break;
            case 644:
              injection.push(vul);
              break;
            case 652:
              injection.push(vul);
              break;
            case 917:
              injection.push(vul);
              break;
            case 1348:
              insecureDesign.push(vul);
              break;
            case 73:
              insecureDesign.push(vul);
              break;
            case 183:
              insecureDesign.push(vul);
              break;
            case 209:
              insecureDesign.push(vul);
              break;
            case 213:
              insecureDesign.push(vul);
              break;
            case 235:
              insecureDesign.push(vul);
              break;
            case 256:
              insecureDesign.push(vul);
              break;
            case 257:
              insecureDesign.push(vul);
              break;
            case 266:
              insecureDesign.push(vul);
              break;
            case 269:
              insecureDesign.push(vul);
              break;
            case 280:
              insecureDesign.push(vul);
              break;
            case 311:
              insecureDesign.push(vul);
              break;
            case 312:
              insecureDesign.push(vul);
              break;
            case 313:
              insecureDesign.push(vul);
              break;
            case 316:
              insecureDesign.push(vul);
              break;
            case 419:
              insecureDesign.push(vul);
              break;
            case 430:
              insecureDesign.push(vul);
              break;
            case 434:
              insecureDesign.push(vul);
              break;
            case 444:
              insecureDesign.push(vul);
              break;
            case 451:
              insecureDesign.push(vul);
              break;
            case 472:
              insecureDesign.push(vul);
              break;
            case 501:
              insecureDesign.push(vul);
              break;
            case 522:
              insecureDesign.push(vul);
              break;
            case 525:
              insecureDesign.push(vul);
              break;
            case 539:
              insecureDesign.push(vul);
              break;
            case 579:
              insecureDesign.push(vul);
              break;
            case 598:
              insecureDesign.push(vul);
              break;
            case 602:
              insecureDesign.push(vul);
              break;
            case 642:
              insecureDesign.push(vul);
              break;
            case 646:
              insecureDesign.push(vul);
              break;
            case 650:
              insecureDesign.push(vul);
              break;
            case 653:
              insecureDesign.push(vul);
              break;
            case 656:
              insecureDesign.push(vul);
              break;
            case 657:
              insecureDesign.push(vul);
              break;
            case 799:
              insecureDesign.push(vul);
              break;
            case 807:
              insecureDesign.push(vul);
              break;
            case 840:
              insecureDesign.push(vul);
              break;
            case 841:
              insecureDesign.push(vul);
              break;
            case 927:
              insecureDesign.push(vul);
              break;
            case 1021:
              insecureDesign.push(vul);
              break;
            case 1173:
              insecureDesign.push(vul);
              break;
            case 1349:
              securityMisconf.push(vul);
              break;
            case 2:
              securityMisconf.push(vul);
              break;
            case 11:
              securityMisconf.push(vul);
              break;
            case 13:
              securityMisconf.push(vul);
              break;
            case 15:
              securityMisconf.push(vul);
              break;
            case 16:
              securityMisconf.push(vul);
              break;
            case 260:
              securityMisconf.push(vul);
              break;
            case 315:
              securityMisconf.push(vul);
              break;
            case 520:
              securityMisconf.push(vul);
              break;
            case 526:
              securityMisconf.push(vul);
              break;
            case 537:
              securityMisconf.push(vul);
              break;
            case 541:
              securityMisconf.push(vul);
              break;
            case 547:
              securityMisconf.push(vul);
              break;
            case 611:
              securityMisconf.push(vul);
              break;
            case 614:
              securityMisconf.push(vul);
              break;
            case 756:
              securityMisconf.push(vul);
              break;
            case 776:
              securityMisconf.push(vul);
              break;
            case 942:
              securityMisconf.push(vul);
              break;
            case 1004:
              securityMisconf.push(vul);
              break;
            case 1032:
              securityMisconf.push(vul);
              break;
            case 1174:
              securityMisconf.push(vul);
              break;
            case 1352:
              outdatedComp.push(vul);
              break;
            case 937:
              outdatedComp.push(vul);
              break;
            case 1035:
              outdatedComp.push(vul);
              break;
            case 1104:
              outdatedComp.push(vul);
              break;
            case 1353:
              authFail.push(vul);
              break;
            case 255:
              authFail.push(vul);
              break;
            case 259:
              authFail.push(vul);
              break;
            case 287:
              authFail.push(vul);
              break;
            case 288:
              authFail.push(vul);
              break;
            case 290:
              authFail.push(vul);
              break;
            case 294:
              authFail.push(vul);
              break;
            case 295:
              authFail.push(vul);
              break;
            case 297:
              authFail.push(vul);
              break;
            case 300:
              authFail.push(vul);
              break;
            case 302:
              authFail.push(vul);
              break;
            case 304:
              authFail.push(vul);
              break;
            case 306:
              authFail.push(vul);
              break;
            case 307:
              authFail.push(vul);
              break;
            case 346:
              authFail.push(vul);
              break;
            case 384:
              authFail.push(vul);
              break;
            case 521:
              authFail.push(vul);
              break;
            case 613:
              authFail.push(vul);
              break;
            case 620:
              authFail.push(vul);
              break;
            case 640:
              authFail.push(vul);
              break;
            case 798:
              authFail.push(vul);
              break;
            case 940:
              authFail.push(vul);
              break;
            case 1216:
              authFail.push(vul);
              break;
            case 1354:
              dataIntegrityFail.push(vul);
              break;
            case 353:
              dataIntegrityFail.push(vul);
              break;
            case 426:
              dataIntegrityFail.push(vul);
              break;
            case 494:
              dataIntegrityFail.push(vul);
              break;
            case 502:
              dataIntegrityFail.push(vul);
              break;
            case 565:
              dataIntegrityFail.push(vul);
              break;
            case 784:
              dataIntegrityFail.push(vul);
              break;
            case 829:
              dataIntegrityFail.push(vul);
              break;
            case 830:
              dataIntegrityFail.push(vul);
              break;
            case 915:
              dataIntegrityFail.push(vul);
              break;
            case 1355:
              loggingFail.push(vul);
              break;
            case 117:
              loggingFail.push(vul);
              break;
            case 223:
              loggingFail.push(vul);
              break;
            case 532:
              loggingFail.push(vul);
              break;
            case 778:
              loggingFail.push(vul);
              break;
            case 1356:
              requestForg.push(vul);
              break;
            case 918:
              requestForg.push(vul);
              break;
            default:
              misc.push(vul);
              break;
          }

      resolve(vul);
    }
    }); // End vulnArray forEach loop
  });

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
  
  await new Promise((resolve, reject) => {
    exec('del /f ' + dir + '.zip', (error, stdout) => {
      if(error) {
        reject(error);
      }
      else {
        resolve(stdout);
      }
    });
  });

  return [brokenAccess, cryptFailures, injection, insecureDesign, securityMisconf, outdatedComp, authFail, dataIntegrityFail, loggingFail, requestForg, misc];
}

async function getMits(link) {
  var mitigations = 'Potential Mitigations:\n\n';

  const axios = require('axios');

  await new Promise((resolve, reject) => {
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
          resolve(mitigations);
        })
        .catch((error) => {
          reject(error);
        });
  });

  return mitigations;
}