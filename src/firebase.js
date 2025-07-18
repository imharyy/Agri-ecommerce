import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZVpMMQfXIkqfs-7GI-1CG9aBanpp5LK4",
  authDomain: "patidar-agri-ecommerce.firebaseapp.com",
  projectId: "patidar-agri-ecommerce",
  storageBucket: "patidar-agri-ecommerce.appspot.com",
  messagingSenderId: "564401670635",
  appId: "1:564401670635:web:f03b598c3b65143f02b1ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
