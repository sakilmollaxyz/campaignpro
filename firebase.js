// firebase.js

// Firebase SDK ইম্পোর্ট
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// আপনার ফায়ারবেজ কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyBuSY5uuSpz_YItfoKVBEmuXQ4FUZHbzZA",
  authDomain: "campaign-pro-8b9db.firebaseapp.com",
  databaseURL: "https://campaign-pro-8b9db-default-rtdb.firebaseio.com",
  projectId: "campaign-pro-8b9db",
  storageBucket: "campaign-pro-8b9db.firebasestorage.app",
  messagingSenderId: "561667716127",
  appId: "1:561667716127:web:d1b3595ff11e044be8112a",
  measurementId: "G-GYGVR9C60M"
};

// Firebase ইনিশিয়ালাইজেশন
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Telegram Web App অবজেক্ট (নিরাপদভাবে চেক করা)
const tg = window.Telegram ? window.Telegram.WebApp : null;
if (tg) {
    try {
        tg.expand(); // অ্যাপটিকে টেলিগ্রামে ফুলস্ক্রিন করে ওপেন করবে
    } catch (e) {
        console.log("Not in Telegram environment.");
    }
}

// ==========================================
// হাইব্রিড লগইন চেকার (টেলিগ্রাম + ব্রাউজার)
// ==========================================
export async function checkAuthStatus() {
    const currentPage = window.location.pathname.split("/").pop();

    // ১. চেক করুন ইউজার টেলিগ্রাম থেকে এসেছে কি না
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const tgUser = tg.initDataUnsafe.user;
        const tgUserId = tgUser.id.toString();

        // ফায়ারস্টোরে ইউজারের ডেটা চেক করা
        const userRef = doc(db, "users", tgUserId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            // নতুন ইউজার হলে ফায়ারস্টোরে অ্যাকাউন্ট তৈরি করে দেওয়া
            await setDoc(userRef, {
                name: tgUser.first_name + " " + (tgUser.last_name || ""),
                username: tgUser.username || "",
                telegram_id: tgUserId,
                balance: 0,
                role: "user",
                joined_at: new Date()
            });
            console.log("নতুন টেলিগ্রাম ইউজার সেভ হয়েছে!");
        }

        // যদি ইউজার লগইন বা সাইনআপ পেজে থাকে, তবে সরাসরি ড্যাশবোর্ডে পাঠিয়ে দেওয়া
        if (currentPage === "login.html" || currentPage === "signup.html" || currentPage === "index.html") {
            window.location.href = "dashboard.html"; 
        }

    } else {
        // ২. ব্রাউজার থেকে ওপেন হলে Firebase Auth (Email/Pass) চেক করা
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // ইউজার ব্রাউজারে লগইন করা আছে
                if (currentPage === "login.html" || currentPage === "signup.html" || currentPage === "index.html") {
                    window.location.href = "dashboard.html";
                }
            } else {
                // ইউজার ব্রাউজারে লগইন নেই
                const publicPages = ["index.html", "login.html", "signup.html", "admin-login.html", ""];
                if (!publicPages.includes(currentPage)) {
                    // লগইন ছাড়া অন্য পেজে যেতে চাইলে লগইন পেজে পাঠিয়ে দেবে
                    window.location.href = "login.html";
                }
            }
        });
    }
}

// লগআউট ফাংশন
export function logoutUser() {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("লগআউট এরর:", error);
    });
}
