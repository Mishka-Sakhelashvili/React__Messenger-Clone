import firebase from "firebase";

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyBfIXzcAURud-eL0a-VZSwKAkOyVBd4K-o",
    authDomain: "chat-app-54a0a.firebaseapp.com",
    databaseURL: "https://chat-app-54a0a.firebaseio.com",
    projectId: "chat-app-54a0a",
    storageBucket: "chat-app-54a0a.appspot.com",
    messagingSenderId: "400891114513",
    appId: "1:400891114513:web:05b50cc6f84494beb82db0",
    measurementId: "G-161F9VN886"
});

const db = firebaseApp.firestore();

export default db;