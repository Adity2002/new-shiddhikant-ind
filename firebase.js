// Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

// Firebase services
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCnqpWwGxJ4aw5hZhRwfhyJXvFSLuLEmTc",
  authDomain: "new-shiddhikant-jewellers.firebaseapp.com",
  projectId: "new-shiddhikant-jewellers",
  storageBucket: "new-shiddhikant-jewellers.firebasestorage.app",
  messagingSenderId: "748541914530",
  appId: "1:748541914530:web:27891e77d0c33871a5d6fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
