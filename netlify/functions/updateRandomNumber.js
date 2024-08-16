const admin = require('firebase-admin');
const serviceAccount = require('./keys/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://matka-78bf1-default-rtdb.europe-west1.firebasedatabase.app'
});

const db = admin.database();

exports.handler = async function(event, context) {
  try {
    const number = Math.floor(Math.random() * 100);
    const ref = db.ref('randomNumbers');
    await ref.set({ number });

    console.log(`Number updated to: ${number}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Number updated successfully' })
    };
  } catch (error) {
    console.error('Error updating number:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating number' })
    };
  }
};
