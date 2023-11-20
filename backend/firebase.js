const { initializeApp } = require("firebase/app");
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
    apiKey: "AIzaSyCBJvyG6YVg8Q29a78v1i0j_dSretqMr2w",
    authDomain: "chicify-130f5.firebaseapp.com",
    projectId: "chicify-130f5",
    storageBucket: "chicify-130f5.appspot.com",
    messagingSenderId: "969513441805",
    appId: "1:969513441805:web:37d5b8e22fc9e2d66b9344"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = {firebaseConfig, storage}