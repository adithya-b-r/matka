// Import Firebase SDKs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { getDatabase, ref, set, get, child, update } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-5GSJvxnDk0XDmG62IXc8QIR-Kb4QiCo",
  authDomain: "matka-78bf1.firebaseapp.com",
  databaseURL: "https://matka-78bf1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "matka-78bf1",
  storageBucket: "matka-78bf1.appspot.com",
  messagingSenderId: "979382842776",
  appId: "1:979382842776:web:6c7d2e67f1030bc76b27ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Function to sign up a user
export function signUpUser(phoneNumber, password) {
  return createUserWithEmailAndPassword(auth, phoneNumber + "@example.com", password)
    .then((userCredential) => {
      console.log('User signed up successfully:', userCredential.user);
      createUserDatabaseEntry(phoneNumber); // Create database entry for new user
      return userCredential.user;
    })
    .catch((error) => {
      console.error('Error signing up:', error);
      throw error;
    });
}

// Function to log in a user
export function loginUser(phoneNumber, password) {
  return signInWithEmailAndPassword(auth, phoneNumber + "@example.com", password)
    .then((userCredential) => {
      console.log('User logged in successfully:', userCredential.user);
      return userCredential.user;
    })
    .catch((error) => {
      console.error('Error logging in:', error);
      throw error;
    });
}

// Function to check if the user is logged in
export function CheckSession() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userPhone = user.email.split("@")[0]; // Extract phone number
        const userName = user.displayName || "User"; // You can set/display the user's name here
        resolve({ loggedIn: true, userName, userPhone });
      } else {
        resolve({ loggedIn: false, userName: null, userPhone: null });
      }
    });
  });
}

// Function to log out the user
export function logoutUser() {
  return signOut(auth)
    .then(() => {
      console.log('User signed out successfully');
      // Redirect home page after logout
      window.location.href = '/index.html'; 
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
}

// Function to create a new user entry in the database
function createUserDatabaseEntry(phoneNumber) {
  const userRef = ref(db, 'users/' + phoneNumber);
  set(userRef, {
    history: [],
    balance: 0,
    wallet: 0 // Initialize wallet with 0 balance
  }).then(() => {
    console.log('User database entry created successfully.');
  }).catch((error) => {
    console.error('Error creating user database entry:', error);
  });
}

// Function to update user balance
export function updateUserBalance(phoneNumber, newBalance) {
  const userRef = ref(db, 'users/' + phoneNumber);
  update(userRef, {
    balance: newBalance
  }).then(() => {
    console.log('User balance updated successfully.');
  }).catch((error) => {
    console.error('Error updating user balance:', error);
  });
}

// Function to get user wallet balance
export function getUserWalletBalance(phoneNumber) {
  const walletRef = ref(db, 'users/' + phoneNumber + '/balance');
  return get(walletRef).then((snapshot) => {
    if (snapshot.exists()) {
      console.log('Wallet balance fetched successfully:', snapshot.val());
      const balance = snapshot.val();
      return balance;
    } else {
      console.log('No wallet balance found.');
      return 0; // Return 0 if no balance is found
    }
  }).catch((error) => {
    console.error('Error fetching wallet balance:', error);
    throw error;
  });
}

// Add this to session.js if not already there
// export function displayWalletBalance(phoneNumber) {
//   const userRef = ref(db, 'users/' + phoneNumber + '/balance');
//   get(userRef).then((snapshot) => {
//       if (snapshot.exists()) {
//           const balance = snapshot.val();
//           document.getElementById('walletBalance').innerText = balance;
//           document.getElementById('PointsAdd').value = balance; // update the hidden input value
//       } else {
//           console.log('No balance found, setting to 0.');
//           updateUserBalance(phoneNumber, 0); // Initialize balance if not found
//           document.getElementById('walletBalance').innerText = '0';
//       }
//   }).catch((error) => {
//       console.error('Error fetching wallet balance:', error);
//   });
// }

// Function to update user wallet balance
export function updateUserWalletBalance(phoneNumber, newBalance) {
  const walletRef = ref(db, 'users/' + phoneNumber + '/wallet');
  return set(walletRef, newBalance).then(() => {
    console.log('Wallet balance updated successfully.');
  }).catch((error) => {
    console.error('Error updating wallet balance:', error);
    throw error;
  });
}

// Function to add to user history
export function addToUserHistory(phoneNumber, entry) {
  const userRef = ref(db, 'users/' + phoneNumber + '/history');
  get(userRef).then((snapshot) => {
    const history = snapshot.exists() ? snapshot.val() : [];
    history.push(entry);
    set(userRef, history).then(() => {
      console.log('User history updated successfully.');
    }).catch((error) => {
      console.error('Error updating user history:', error);
    });
  }).catch((error) => {
    console.error('Error fetching user history:', error);
  });
}

// Function to get game results
export async function fetchAllGameResults() {
  try {
    const results = {};
    const games = [
      "GAZIYABAAD",
      "DESAWAR",
      "GALI",
      "FARIDABAD",
      "GOLDSTAR",
      "GHAZIABAD DIN"
    ];

    const dbRef = ref(db, 'randomNumbers');
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const date in data) {
        results[date] = {};
        for (const game of games) {
          results[date][game] = data[date][game] || '---';
        }
      }
    } else {
      console.log('No data available.');
    }

    return results;
  } catch (error) {
    console.error('Error fetching game results:', error);
    throw error;
  }
}
