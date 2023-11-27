import { auth } from './config.js';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

const form = document.querySelector('#siform');
const naam = document.querySelector('#siname');
const email = document.querySelector('#siemail');
const password = document.querySelector('#sipassword');
const forgotBtn = document.querySelector('#forgot');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Perform user sign-in
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((res) => {
            const user = res.user;
            console.log('User signed in:', user);
            window.location = './home.html';
        })
        .catch((error) => {
            alert("You Type Wrong Password or Email")
            const errorMessage = error.message;
            console.log('Sign-in error:', errorMessage);
        });
});

forgotBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const user = auth.currentUser;
const newPassword = prompt('Enter your new password');


const sentEmail = prompt("Enter the Email to Reset Password")
sendPasswordResetEmail(auth, sentEmail)
  .then(() => {
    // Password reset email sent!
    // ..
    alert("Check Your Email")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error code ==> ',errorCode)
    console.log('error message ==> ',errorMessage)
  });
});