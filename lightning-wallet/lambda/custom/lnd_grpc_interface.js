const fs = require('fs');
const grpc = require('grpc');
var lnrpc = grpc.load('./rpc.proto').lnrpc;
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';
var lndCert = fs.readFileSync('./tls.cert');
var sslCreds = grpc.credentials.createSsl(lndCert);
var macaroonCreds = grpc.credentials.createFromMetadataGenerator(function(args, callback) {
  var macaroon = fs.readFileSync('./admin.macaroon').toString('hex');
  var metadata = new grpc.Metadata();
  metadata.add('macaroon', macaroon);
  callback(null, metadata);
});
const creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
const lightning = new lnrpc.Lightning('3.83.83.82:10001', creds); //using Bob node

module.exports = lightning;
