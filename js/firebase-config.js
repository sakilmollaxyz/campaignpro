const firebaseConfig = {
    apiKey: "AIzaSyBuSY5uuSpz_YItfoKVBEmuXq4FUZHbzZA",
    authDomain: "campaign-pro-8b9db.firebaseapp.com",
    projectId: "campaign-pro-8b9db",
    storageBucket: "campaign-pro-8b9db.firebasestorage.app",
    messagingSenderId: "561667716127",
    appId: "1:561667716127:web:d1b3595ff11e044be8112a",
    measurementId: "G-GYGVR9C60M"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
