import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_ta-dUaZydn49QfA_6WKVkSknGnJul5Y",
    authDomain: "my-project-1535308898377.firebaseapp.com",
    projectId: "my-project-1535308898377",
    storageBucket: "my-project-1535308898377.appspot.com",
    messagingSenderId: "173866131250",
    appId: "1:173866131250:web:958c030b30a25464a3c12b",
    measurementId: "G-71GLKKQD97"
  };

export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export default firebase;