//Load modules
const fs = require("fs");
const execSync = require("child_process").execSync;

//Read config.json
const filePath = "./boxTokener/config.json"
const config = JSON.parse(fs.readFileSync(filePath,"utf8"))["boxAppSettings"];

//Get params
const clientId = config["clientID"];
const clientSecret = config["clientSecret"];
const publicKeyId = config["appAuth"]["publicKeyID"];
const privateKeyPath = config["appAuth"]["privateKey"];
const passPhrase = config["appAuth"]["passphrase"];
const userId = config["userId"];

//Generate cmd: node-box-tokener
const cmd = "cd boxTokener;node index.js -C "+clientId+" -U "+userId+" -K "+privateKeyPath+" -P "+passPhrase+" -S "+clientSecret+" -Q "+publicKeyId;

const token = execSync(cmd).toString().replace(/\r?\n/g,"");
console.log(token);
