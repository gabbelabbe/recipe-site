var admin = require("firebase-admin");

var serviceAccount = require("./firebase-secret.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://recipe-express-backend.firebaseio.com"
});

const db = admin.firestore();

module.exports = { db }