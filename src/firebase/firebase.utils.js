import firebase from 'firebase/app';
import "firebase/storage"
import "firebase/firestore";

var config = {
    apiKey: "AIzaSyByX8tD8fSO7j8H0gH8CvWR7xKF7y1JE80",
    authDomain: "image-tagger-2cbdb.firebaseapp.com",
    databaseURL: "https://image-tagger-2cbdb.firebaseio.com",
    projectId: "image-tagger-2cbdb",
    storageBucket: "gs://image-tagger-2cbdb.appspot.com",
    
    messagingSenderId: "265601686017",
    appId: "1:265601686017:web:4191feedcd2de7a080be00",
    measurementId: "G-B9ZGCFPQPT"
  };

  firebase.initializeApp(config);

  export const firestore = firebase.firestore();
  var storage = firebase.storage();
  export const  storageRef = storage.ref();
  


  export default firebase;