import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyA8r3yHyY5MZDp7a7nxTj5j6oRWNujIpew",
  authDomain: "linkedin-clone-c753f.firebaseapp.com",
  projectId: "linkedin-clone-c753f",
  storageBucket: "linkedin-clone-c753f.appspot.com",
  messagingSenderId: "686287734958",
  appId: "1:686287734958:web:47fa8095aab547a3df053f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const sendPost = () => {
    db.collection('posts').add({
        name: "ajkhkdjshakd",
        description: "mohit@gmail.com",
        message: "hello how are you",
        photoUrl: "",
    });
};

sendPost();