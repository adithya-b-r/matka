const admin = require('firebase-admin');
const serviceAccount = require('./keys/serviceAccountKey.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://matka-78bf1-default-rtdb.europe-west1.firebasedatabase.app'
});

const db = admin.database();

exports.handler = async (event, context) => {
  try {
    // Example operation: write a test value to Firebase
    await db.ref('test').set({
      message: 'Netlify function is working!',
      timestamp: new Date().toISOString()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Function executed successfully!' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Function execution failed' })
    };
  }
};
