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
  // Get the current date/time in IST and format as needed
  const today = new Date();
  const dateTimeIST = today.toLocaleString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }).replace(/,/g, '');
  console.log(`Current Date/Time (IST): ${dateTimeIST}`);
  
  // Extract the date in DD_MM_YYYY format
  const [date, time] = dateTimeIST.split(' ');
  const [day, month, year] = date.split('-');
  const formattedDate = `${day}`.replaceAll('/','_');

  // Extract the hour from the time string
  const currentHourIST = parseInt(time.split(':')[0], 10);

  try {
    for (const game of games) {
      if (currentHourIST >= game.startHour && currentHourIST < game.endHour) {
        const ref = db.ref(`randomNumbers/${formattedDate}/${game.name}`);

        const numbers = [];
        for (let i = 0; i < 3; i++) {
          numbers.push(Math.floor(Math.random() * 100));
        }

        const snapshot = await ref.once('value');
        const existingData = snapshot.val() || '';
        const existingNumbers = existingData.split(', ').filter(num => num).map(Number);
        
        //Start
          if (existingNumbers.length < 3) {
          const numbers = [];
          while (numbers.length < 3 - existingNumbers.length) {
            const newNumber = Math.floor(Math.random() * 100);
            if (!existingNumbers.includes(newNumber)) {
              numbers.push(newNumber);
            }
          }

          const updatedData = existingData ? `${existingData}, ${numbers.join(', ')}` : `${numbers.join(', ')}`;
          await ref.set(updatedData);
        //End

        return {
          statusCode: 200,
          body: JSON.stringify({ message: `Numbers ${numbers.join(', ')} appended to ${game.name} for ${formattedDate}.` }),
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
