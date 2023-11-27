// import { auth } from './config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore, collection, getDoc, doc, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyDhvJ24kaE8wc03h45FDtR5Oqzvw8eVo8g",
    authDomain: "saylani-cf27d.firebaseapp.com",
    projectId: "saylani-cf27d",
    storageBucket: "saylani-cf27d.appspot.com",
    messagingSenderId: "708929124417",
    appId: "1:708929124417:web:5e612e76cdcd1bb598eec0",
    measurementId: "G-313678XNTE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// const db = getFirestore(app);
const form = document.querySelector('#suform');
const naam = document.querySelector('#suname');
const email = document.querySelector('#suemail');
const password = document.querySelector('#supass');

form.addEventListener('submit', (event)=> {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async(res)=>{
        // res.user.updateProfile({
        //     displayName: naam
        //   });
          const user = res.user;
        console.log(user);
        try {
            const docRef = await addDoc(collection(db, "users"), {
              first: email.value,
              last: password.value,
            });
            console.log("Document written with ID: ", docRef.id);
            alert('han signup hogaya')
            location.href = './login.html'
          }
           catch (e) {
            console.error("Error adding document: ", e);
          }
        // window.location = './login.html';
    })
    .catch((error)=>{
        const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);

    })
})