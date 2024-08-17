const admin = require('firebase-admin');

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
  const today = new Date();
  const currentHourIST = today.getUTCHours() + 5; // Adjust for IST (UTC +5:30)
  const currentMinuteIST = today.getUTCMinutes() + 30;

  if (currentMinuteIST >= 60) {
    currentHourIST += 1;
  }

  console.log(`Current Hour (IST): ${currentHourIST}`);

  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const dateKey = `${day}_${month}_${year}`;

  try {
    for (const game of games) {
      if (currentHourIST >= game.startHour && currentHourIST < game.endHour) {
        const ref = db.ref(`randomNumbers/${dateKey}/${game.name}`);

        const numbers = [];
        
        numbers.push(Math.floor(Math.random() * 100));
        

        const snapshot = await ref.once('value');
        const existingData = snapshot.val() || '';
        const updatedData = existingData ? `${existingData}, ${numbers.join(', ')}` : `${numbers.join(', ')}`;

        console.log(updatedData);
        console.log(`randomNumbers/${dateKey}/${game.name}`)
        
        await ref.set(updatedData);

        return {
          statusCode: 200,
          body: JSON.stringify({ message: `Numbers ${numbers.join(', ')} appended to ${game.name} for ${dateKey}.` }),
        };
      }
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'No game is currently active.' }),
    };
  } catch (error) {
    console.error('Error updating random number:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update random number.' }),
    };
  }
};
