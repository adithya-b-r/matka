// Import Firebase SDKs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { getDatabase, ref, get, child } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

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