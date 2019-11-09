/**
 * Script name  : rest_server.js
 * Description  : Run a REST server and get token
 * Change_tracking: Date /Name /Description
 * 2019/10/04 / Create
*/

//Load the express, json-parser module
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Load the https module,and read certsificate
const fs = require("fs");
const https = require("https");
const sslOptions = {
  key: fs.readFileSync("certs/server_key.pem"),
  certs: fs.readFileSync("certs/server_crt.pem"),
  ca: fs.readFileSync("certs/ca_crt.pem")
};

//Load module to execute tokenTool
const execSync = require("child_process").execSync;

//Load middleware function(bodyParser)
app.use(bodyParser.json());

//GET request processing
app.get("/api/token", function(req, res){
  res.send("Yo");
});

//https server execution part
https.createServer(sslOptions,app).listen(3000);
