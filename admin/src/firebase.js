// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCjb0BBJrc6up4YqOBSwbXI9HL3L3OcVE",
    authDomain: "shopping-cart-cb24d.firebaseapp.com",
    projectId: "shopping-cart-cb24d",
    storageBucket: "shopping-cart-cb24d.appspot.com",
    messagingSenderId: "207213750287",
    appId: "1:207213750287:web:2f6eab6bc8cd3b00439b7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app