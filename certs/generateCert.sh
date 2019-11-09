#!/bin/bash

# ToDo: Global-ip-address of this server
globalIP="127.0.0.1"

# ToDo: CA certs configuration
country="JP"
state="Tokyo"
location="Chiyoda-ku"
organization="MyOrganization"
organizationUnit="IT system division"
certExpirationDate=73000

set -e

# Processing start
# Copy openssl.cnf from default openssl directory
opensslDir=`openssl version -a | grep OPENSSLDIR | sed 's/^.*"\(.*\)".*$/\1/'`
cp ${opensslDir}/openssl.cnf .

# Modify the openssl.cnf for IP-based certificates
sed -i -e '/^#.*req_extensions = v3_req/s/^# //' \
  -e "/^\[ v3_req \]$/a subjectAltName=@alt_names" \
  -e "/^keyUsage = nonRepudiation, digitalSignature, keyEncipherment$/a \[ alt_names \]\nIP.1 = ${globalIP}" \
  openssl.cnf

# Generate certs part
# Generate CA private key
openssl genrsa -out ca_key.pem 2048

# Generate CA csr
openssl req -batch -new -key ca_key.pem -out ca_csr.pem -subj \
  "/C=${country}/ST=${state}/L=${location}/O=${organization}/OU=${organizationUnit}/CN=${globalIP}"

# Generate CA self-signed certificate
openssl x509 -in ca_csr.pem -out ca_crt.pem -req -signkey ca_key.pem \
  -days ${certExpirationDate} -sha256

# Generate server private key
openssl genrsa -out server_key.pem 2048

# Generate server csr
openssl req -batch -new -key server_key.pem -out server_csr.pem -subj \
  "/C=${country}/ST=${state}/L=${location}/O=${organization}/OU=${organizationUnit}/CN=${globalIP}" \
  -config openssl.cnf

# Generate server certificate using CA self-signed certificate
openssl x509 -req -in server_csr.pem -CA ca_crt.pem -CAkey ca_key.pem \
  -CAcreateserial -out server_crt.pem -days ${certExpirationDate} -extensions v3_req -extfile openssl.cnf

echo -e '\e[32mProcessing success!\e[m'
echo -e "Next Step:\n1. Let's setting files to your server. And run it on https. \n ・key: server_key.pem\n ・cert: erver_crt.pem\n ・ca: ca_crt.pem\n2. Upload \"ca_crt.pem\" to OIC Integration."
