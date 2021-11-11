import firebase from "firebase";

//firebase configuration. Shift to env file later
const firebaseConfig = {

    apiKey: "AIzaSyAXQlPCChCX30xfqy9f5R-vJH0TGj3Tw44",
  
    authDomain: "virtual-classroom-b6fed.firebaseapp.com",
  
    databaseURL: "https://virtual-classroom-b6fed-default-rtdb.firebaseio.com",
  
    projectId: "virtual-classroom-b6fed",
  
    storageBucket: "virtual-classroom-b6fed.appspot.com",
  
    messagingSenderId: "115896894901",
  
    appId: "1:115896894901:web:74f2270878d23f3879c5fc"
  
  };
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Sign in and check or create account in firestore
const signInWithGoogle = async () => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    console.log(response.user);
    const user = response.user;
    console.log(`User ID - ${user.uid}`);
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (querySnapshot.docs.length === 0) {
      // create a new user
      await db.collection("users").add({
        uid: user.uid,
        enrolledClassrooms: [],
      });
    }
  } catch (err) {
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export { app, auth, db, signInWithGoogle, logout };