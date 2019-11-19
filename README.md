# What does this script do?
This script can run API server that get box api token, using express and node-box-tokener.

# How to use this ?
1. Prepare private.pem and public.pem and allocate to /boxTokener/keys.
2. Modify boxTokener/config.json for your box apps. (User apps only)
3. Modify certs/generateCerts.sh for your server info and run it.

## Run API server
```
node restServer.js
```
## Test using curl command
```
curl https://localhost:3000/api/token
```
