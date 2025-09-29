// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";        // Nếu dùng đăng nhập
import { getFirestore } from "firebase/firestore"; // Nếu dùng database
import { getStorage } from "firebase/storage";     // Nếu dùng lưu file

// Dán config copy từ Firebase Console vào đây
const firebaseConfig = {
  apiKey: "AIzaSyD9zNA8UttdMbu6IzzGQhKZ5dM0bvTDA3I",
  authDomain: "chat-live-570b8.firebaseapp.com",
  projectId: "chat-live-570b8",
  storageBucket: "chat-live-570b8.firebasestorage.app",
  messagingSenderId: "134940696943",
  appId: "1:134940696943:web:ae0741978113299d54c89a"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Xuất ra các service để dùng trong Vue
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
