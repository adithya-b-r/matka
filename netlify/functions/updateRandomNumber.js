// netlify/functions/updateRandomNumber.js
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./keys/serviceAccountKey.json'); // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://matka-78bf1-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

exports.handler = async function(event, context) {
  const randomNumber = Math.floor(Math.random() * 100); // Generate random number between 0 and 99

  try {
    await db.ref('randomNumber').set(randomNumber); // Update the random number in Firebase
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Random number ${randomNumber} written to database.` }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
