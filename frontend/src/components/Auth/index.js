import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import 'firebase/app';
import { auth } from '../../Firebase/firebase';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

class Login extends React.Component {
  signWith(provider) {
    signInWithPopup(auth, provider);
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', border: '1px solid black', borderRadius: '10px' }}>
          <h1>Welcome to chat</h1>
          <button onClick={() => this.signWith(providerGoogle)} style={{ margin: '10px', padding: '10px', backgroundColor: 'blue', color: 'white' }}>
            <GoogleOutlined /> Sign in with Google
          </button>
          <button onClick={() => this.signWith(providerFacebook)} style={{ margin: '10px', padding: '10px', backgroundColor: 'blue', color: 'white' }}>
            <FacebookOutlined /> Sign In with Facebook
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
