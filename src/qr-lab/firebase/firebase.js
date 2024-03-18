import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBKfxDuj3lVNZr8Vy4TCt1hlbrOF45f-1k",
  authDomain: "qrlab-shop.firebaseapp.com",
  projectId: "qrlab-shop",
  storageBucket: "qrlab-shop.appspot.com",
  messagingSenderId: "438268528733",
  appId: "1:438268528733:web:ff010ef33bb32ef9b1e5b4",
  measurementId: "G-F4X6ZNC3YR",
}

const app = initializeApp(firebaseConfig)
export const fireStoreDb = getFirestore(app)
export const db = getDatabase(app)
export const auth = getAuth(app)
export const storage = getStorage()
