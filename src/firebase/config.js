import firebase from "firebase/app";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator  } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC0-lmux4ZP0gdgfzlOlbji9ykosrPrOmY",
	authDomain: "lokastay2023-8a2a1.firebaseapp.com",
	projectId: "lokastay2023-8a2a1",
	storageBucket: "lokastay2023-8a2a1.appspot.com",
	messagingSenderId: "1096073722568",
	appId: "1:1096073722568:web:3972f3285399586da683fd",
	measurementId: "G-VN287SF8ZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
auth.languageCode = 'vi';
const db = getFirestore(app);

// connectAuthEmulator(auth, "http://localhost:9099");
// connectFirestoreEmulator(db, 'localhost', 8080);

export { db, auth };
