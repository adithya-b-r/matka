const admin = require('firebase-admin');
const moment = require('moment'); // For date formatting

// Initialize Firebase Admin SDK
const serviceAccount = require('./keys/serviceAccountKey.json'); // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://matka-78bf1-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

exports.handler = async function(event, context) {
  const randomNumber = Math.floor(Math.random() * 100); // Generate random number between 0 and 99

  // Format the current date as DD_MM_YYYY
  const dateKey = moment().format('DD_MM_YYYY');

  try {
    // Get the reference to the database location for today's date
    const ref = db.ref(`randomNumbers/${dateKey}`);

    // Read the current data at this location
    const snapshot = await ref.once('value');
    const existingData = snapshot.val() || '';

    // Append the new random number to the existing data
    const updatedData = existingData ? `${existingData},${randomNumber}` : `${randomNumber}`;

    // Update the database with the new data
    await ref.set(updatedData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Random number ${randomNumber} appended to database for ${dateKey}.` }),
    };
  } catch (error) {
    console.error('Error updating random number:', error); // More detailed error logging
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update random number.' }),
    };
  }
};
