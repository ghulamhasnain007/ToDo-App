import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";



const firebaseConfig = {
  apiKey: "AIzaSyDhvJ24kaE8wc03h45FDtR5Oqzvw8eVo8g",
  authDomain: "saylani-cf27d.firebaseapp.com",
  projectId: "saylani-cf27d",
  storageBucket: "saylani-cf27d.appspot.com",
  messagingSenderId: "708929124417",
  appId: "1:708929124417:web:5e612e76cdcd1bb598eec0",
  measurementId: "G-313678XNTE"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
