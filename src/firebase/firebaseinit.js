// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfOqftNcHEaekNlJdCuloZJlWquyrhdKY",
  authDomain: "seeweather-e31c0.firebaseapp.com",
  projectId: "seeweather-e31c0",
  storageBucket: "seeweather-e31c0.appspot.com",
  messagingSenderId: "658882680555",
  appId: "1:658882680555:web:8978829789dabdfaee50ae"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();