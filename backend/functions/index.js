const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }
  response.send("Hello from Firebase!");
});
