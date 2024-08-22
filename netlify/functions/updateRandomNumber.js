<<<<<<< HEAD
const admin = require('firebase-admin');

const serviceAccount = require('./keys/serviceAccountKey.json'); // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://matka-78bf1-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

// Define the games and the specific times they should be active
const gameTimes = [
  "05:15", "16:15", "16:30", "17:15", "18:00", "20:50", "23:50"
];

const games = [
  "GAZIYABAAD",
  "DESAWAR",
  "GALI",
  "FARIDABAD",
  "GOLDSTAR",
  "GHAZIABAD DIN"
];

// Define the time window in minutes
const timeWindow = 3; // Allowable window in minutes

exports.handler = async function(event, context) {
  // Get the current date/time in IST
  const today = new Date();
  const dateTimeIST = today.toLocaleString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }).replace(/,/g, '');
  console.log(`Current Date/Time (IST): ${dateTimeIST}`);
  
  // Extract the date in DD/MM/YYYY format
  const [date, time] = dateTimeIST.split(' ');
  const [day, month, year] = date.split('-');
  const formattedDate = `${day}`.replaceAll('/','_');

  // Extract the time in HH:MM format
  const currentTimeIST = time.slice(0, 5);
  const currentMinutes = parseInt(time.slice(3, 5), 10);

  try {
    for (const game of games) {
      for (const gameTime of gameTimes) {
        const [gameHour, gameMinute] = gameTime.split(':').map(Number);
        const gameTimeInMinutes = gameHour * 60 + gameMinute;
        const currentTimeInMinutes = parseInt(currentTimeIST.slice(0, 2), 10) * 60 + currentMinutes;

        // Check if current time is within the allowed window of the game time
        if (Math.abs(currentTimeInMinutes - gameTimeInMinutes) <= timeWindow) {
          const ref = db.ref(`randomNumbers/${formattedDate}/${game}`);
          
          const snapshot = await ref.once('value');
          const existingData = snapshot.val();

          if (!existingData) { // If no number is stored for the current time
            const newNumber = Math.floor(Math.random() * 100);
            await ref.set(newNumber);
            console.log(`Number ${newNumber} generated for ${game} at ${currentTimeIST} on ${formattedDate}.`);
          } else {
            console.log(`Number already generated for ${game} at ${currentTimeIST} on ${formattedDate}.`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error generating random number:', error);
  }
};
=======
const admin = require('firebase-admin');

const serviceAccount = require('./keys/serviceAccountKey.json'); // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://matka-78bf1-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

// Define the games and the specific times they should be active
const gameTimes = [
  "05:15", "16:15", "16:30", "17:15", "18:00", "20:50", "23:50"
];

const games = [
  "GAZIYABAAD",
  "DESAWAR",
  "GALI",
  "FARIDABAD",
  "GOLDSTAR",
  "GHAZIABAD DIN"
];

// Define the time window in minutes
const timeWindow = 3; // Allowable window in minutes

exports.handler = async function(event, context) {
  // Get the current date/time in IST
  const today = new Date();
  const dateTimeIST = today.toLocaleString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }).replace(/,/g, '');
  console.log(`Current Date/Time (IST): ${dateTimeIST}`);
  
  // Extract the date in DD/MM/YYYY format
  const [date, time] = dateTimeIST.split(' ');
  const [day, month, year] = date.split('-');
  const formattedDate = `${day}`.replaceAll('/','_');

  // Extract the time in HH:MM format
  const currentTimeIST = time.slice(0, 5);
  const currentMinutes = parseInt(time.slice(3, 5), 10);

  try {
    for (const game of games) {
      for (const gameTime of gameTimes) {
        const [gameHour, gameMinute] = gameTime.split(':').map(Number);
        const gameTimeInMinutes = gameHour * 60 + gameMinute;
        const currentTimeInMinutes = parseInt(currentTimeIST.slice(0, 2), 10) * 60 + currentMinutes;

        // Check if current time is within the allowed window of the game time
        if (Math.abs(currentTimeInMinutes - gameTimeInMinutes) <= timeWindow) {
          const ref = db.ref(`randomNumbers/${formattedDate}/${game}`);
          
          const snapshot = await ref.once('value');
          const existingData = snapshot.val();

          if (!existingData) { // If no number is stored for the current time
            const newNumber = Math.floor(Math.random() * 100);
            await ref.set(newNumber);
            console.log(`Number ${newNumber} generated for ${game} at ${currentTimeIST} on ${formattedDate}.`);
          } else {
            console.log(`Number already generated for ${game} at ${currentTimeIST} on ${formattedDate}.`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error generating random number:', error);
  }
};
>>>>>>> 1229593a5115387d1053ff8992d439ddafbcca87
