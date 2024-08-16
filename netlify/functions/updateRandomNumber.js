const admin = require('firebase-admin');
const serviceAccount = require('./keys/serviceAccountKey.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://matka-78bf1-default-rtdb.europe-west1.firebasedatabase.app'
});

const db = admin.database();

// Store the timestamp of the last execution
let lastExecution = new Date().getTime();

exports.handler = async (event, context) => {
  try {
    const now = new Date().getTime();
    const elapsedTime = now - lastExecution;

    if (elapsedTime >= 30000) { // 30 seconds
      // Update the last execution time
      lastExecution = now;

      // Example operation: write a test value to Firebase
      await db.ref('test').set({
        message: 'Netlify function executed at ' + new Date().toISOString(),
        timestamp: new Date().toISOString()
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Function executed successfully!' })
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Not enough time has passed since last execution' })
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Function execution failed' })
    };
  }
};
