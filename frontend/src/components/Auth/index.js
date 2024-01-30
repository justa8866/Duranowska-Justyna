import React from 'react';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export class Login extends React.Component {
  app = null;
  auth = null;

  constructor() {
    super()
    try{
      this.app = initializeApp(firebaseConfig);
      this.auth = getAuth(this.app);
    } catch(error) {
      console.error(error)
    }
  }

  signWith(provider) {
    signInWithPopup(this.auth, provider);
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', border: '1px solid black', borderRadius: '10px' }}>
          <button onClick={() => this.signWith(providerGoogle)} style={{ margin: '10px', padding: '10px', backgroundColor: 'blue', color: 'white' }}>
            Sign in with Google
          </button>
          <button onClick={() => this.signWith(providerFacebook)} style={{ margin: '10px', padding: '10px', backgroundColor: 'blue', color: 'white' }}>
            Sign In with Facebook
          </button>
        </div>
      </div>
    );
  }
}
