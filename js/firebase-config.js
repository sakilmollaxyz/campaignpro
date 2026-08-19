import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBuSY5uuSpz_YItfoKVBEmuXQ4FUZHbzZA",
    authDomain: "campaign-pro-8b9db.firebaseapp.com",
    projectId: "campaign-pro-8b9db",
    storageBucket: "campaign-pro-8b9db.firebasestorage.app",
    messagingSenderId: "561667716127",
    appId: "1:561667716127:web:d1b3595ff11e044be8112a",
    measurementId: "G-GYGVR9C60M"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


export {
    app,
    auth,
    db
};
