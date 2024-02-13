import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDxY_PtHN4scvG225cACHSC0rdbKDYdUow",
    authDomain: "assignable-backend.firebaseapp.com",
    projectId: "assignable-backend",
    storageBucket: "assignable-backend.appspot.com",
    messagingSenderId: "1059170916534",
    appId: "1:1059170916534:web:ce323c833daea210d52e17"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth() ;
export const storage = getStorage();
export default app ;