//Unique Firebase Object
const firebaseConfig = {
  apiKey: "AIzaSyANBjPGsedrBU7jDWnL3A3nXXbfBTiH1a4",
  authDomain: "login-system-463ce.firebaseapp.com",
  projectId: "login-system-463ce",
  storageBucket: "login-system-463ce.appspot.com",
  messagingSenderId: "877397763364",
  appId: "1:877397763364:web:bfd7dea42a888198917fb1",
  measurementId: "G-HYTVHZE36E",
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//Variable to access database collection
const db = firestore.collection("data");

//Get Submit Form
let submitButton = document.getElementById("submit");

//Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  //Get Form Values
  let username = document.getElementById("username").value;
  if (username.length < 3 || username.length > 10) {
    alert("Your username is too long or short");
    return;
  }
  let password = document.getElementById("password").value;
  if (password.length < 8 || password.length > 24) {
    alert("Your password is too long or short");
    return;
  }
  if (
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      .split("")
      .every((letter) => password.indexOf(letter) == -1) ||
    "1234567890".split("").every((number) => password.indexOf(number) == -1)
  ) {
    alert("Your password shout have at least one number and one letter");
    console.log(password);
    return;
  }
  let registed = db.doc(username);
  registed.get(username).then((doc) => {
    if (doc.exists) {
      alert("This username has already got registed");
    } else {
      //Save Form Data To Firebase
      db.doc(username)
        .set({
          username: username,
          password: password,
        })
        .then(() => {
          alert("Data saved");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});
