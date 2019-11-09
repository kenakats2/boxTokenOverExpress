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
  "key": fs.readFileSync("certs/server_key.pem"),
  "cert": fs.readFileSync("certs/server_crt.pem"),
  "ca": fs.readFileSync("certs/ca_crt.pem")
};

//Load module to execute tokenTool
const func = require("./function.js");

//Load middleware function(bodyParser)
app.use(bodyParser.json());

//GET request processing
app.get("/api/token", function(req, res){

  const response = {
    "token": func.callBoxTokener()
  }
  res.send(response);
});

//https server execution part
https.createServer(sslOptions,app).listen(3000);
