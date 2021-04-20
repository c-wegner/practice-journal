import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgsha6DS_KWdqZAU7ktAUGpMSrRPeMGMU",
  authDomain: "wegner-portal.firebaseapp.com",
  projectId: "wegner-portal",
  storageBucket: "wegner-portal.appspot.com",
  messagingSenderId: "728364174190",
  appId: "1:728364174190:web:6d212e91f83af577d90f7f"
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export default firebase;