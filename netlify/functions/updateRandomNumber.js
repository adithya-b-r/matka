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
  
  // Extract the date in DD/MM/YYYY format
  const [date, time] = dateTimeIST.split(' ');
  const [day, month, year] = date.split('-');
  const formattedDate = `${day}`.replaceAll('/','_');

  // Extract the hour from the time string
  const currentHourIST = parseInt(time.split(':')[0], 10);

  try {
    let gameActive = false;

    for (const game of games) {
      if (currentHourIST >= game.startHour && currentHourIST < game.endHour) {
        gameActive = true;
        const ref = db.ref(`randomNumbers/${formattedDate}/${game.name}`);

        const numbers = [];
        for (let i = 0; i < 3; i++) {
          numbers.push(Math.floor(Math.random() * 100));
        }

        const snapshot = await ref.once('value');
        const existingData = snapshot.val() || '';
        const existingNumbers = existingData.split(', ').filter(num => num).map(Number);

        // Ensure unique numbers
        const newNumbers = [];
        if(existingNumbers.length < 3){
          while (newNumbers.length < 3 - existingNumbers.length) {
            const newNumber = Math.floor(Math.random() * 100);
            if (!existingNumbers.includes(newNumber)) {
              newNumbers.push(newNumber);
              console.log("Generating new Number : "+newNumber);
            }
          } 

          const updatedData = existingNumbers.concat(newNumbers).join(', ');
          await ref.set(updatedData);

        console.log(`Numbers ${newNumbers.join(', ')} appended to ${game.name} for ${formattedDate}.`);
        }else{
          console.log("Already "+existingNumbers.length+" exists.");
        }

        
        return;  // Exit handler function after processing the first active game
      }
    }

    if (!gameActive) {
      console.log('No game is currently active.');
    }
  } catch (error) {
    console.error('Error updating random number:', error);
  }
};
