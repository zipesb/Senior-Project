
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
  console.log(message);
})

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single("file"), (req, res) => {
  const file = req.file;
  res.json('Received file');
  console.log(file);
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


