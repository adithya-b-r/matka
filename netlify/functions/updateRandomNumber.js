const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./keys/serviceAccountKey.json'); // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://matka-78bf1-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

// Define the games and their time slots
const games = [
  { name: "JOKER DAY", startHour: 0, endHour: 4 },
  { name: "BANGAL DAY", startHour: 4, endHour: 8 },
  { name: "DHANRAJ DAY", startHour: 8, endHour: 12 },
  { name: "DHANLAXMI DAY", startHour: 12, endHour: 16 },
  { name: "DHAN KUBER DAY", startHour: 16, endHour: 20 },
  { name: "MUMBAI WORLI DAY", startHour: 20, endHour: 24 },
];

exports.handler = async function(event, context) {
  // Format the current date as DD_MM_YYYY
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = today.getFullYear();
  const dateKey = `${day}_${month}_${year}`;
  
  const currentHour = today.getHours();

  try {
    for (const game of games) {
      // Check if the current time falls within the game's time slot
      if (currentHour >= game.startHour && currentHour < game.endHour) {
        const ref = db.ref(`randomNumbers/${dateKey}/${game.name}`);

        // Generate 3 random numbers
        const numbers = [];
        for (let i = 0; i < 3; i++) {
          numbers.push(Math.floor(Math.random() * 100)); // Generate random number between 0 and 99
        }

        // Read the current data at this location
        const snapshot = await ref.once('value');
        const existingData = snapshot.val() || '';

        // Append the new numbers to the existing data
        const updatedData = existingData ? `${existingData}, ${numbers.join(', ')}` : `${numbers.join(', ')}`;

        // Update the database with the new data
        await ref.set(updatedData);

        return {
          statusCode: 200,
          body: JSON.stringify({ message: `Numbers ${numbers.join(', ')} appended to ${game.name} for ${dateKey}.` }),
        };
      }
    }

    // If no game matches the current time slot
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'No game is currently active.' }),
    };
  } catch (error) {
    console.error('Error updating random number:', error); // More detailed error logging
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update random number.' }),
    };
  }
};
