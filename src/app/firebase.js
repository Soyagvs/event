import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCSASNKmt43SADROGZ37g9jWCWnDw9hong",
    authDomain: "event-f96c8.firebaseapp.com",
    projectId: "event-f96c8",   
    storageBucket: "event-f96c8.appspot.com",
    messagingSenderId: "649444959618",
    appId: "1:649444959618:web:5d9441bab47f0c17199b9b",
    measurementId: "G-HW4HPCJYJ9"       
};

const app = initializeApp(firebaseConfig);

// Exporta Firestore y Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db,storage };
