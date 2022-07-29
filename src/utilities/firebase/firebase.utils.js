import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBuu3rd-GdTOH_hU9xNP8j-5-ECs3oyIhI",
    authDomain: "crown-clothing-db-6340a.firebaseapp.com",
    projectId: "crown-clothing-db-6340a",
    storageBucket: "crown-clothing-db-6340a.appspot.com",
    messagingSenderId: "174265398244",
    appId: "1:174265398244:web:a2929e77f8e26f7f68cdf1"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
}); 

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
 

export const db = getFirestore(); //points to our external database

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    // we are putting additional Information parameter incase we might need to add some extra data to our data storage

    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    // the doc method is used to retrieve the reference of a document in an object format. It takes in the (database, collection name, and a unique identifier for the data)  
    // console.log(userDocRef);

    // we can get a document using the getDoc method
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {

        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch(error) {
            console.log('There was an error retrieving the data', error.message);
        }
    }

    return userDocRef;
}
 
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const authStateChangeListener = (fn) => onAuthStateChanged(auth, fn);