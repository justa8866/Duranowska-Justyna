import React from "react";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app, { auth } from "./firebase";
import {
  CenteredContainer,
  StyledCard,
  StyledButton,
} from "./Auth";

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

export default class Login extends React.Component {
  app = null;
  auth = null;

  constructor() {
    super()
    try{
      this.app = app;
      this.auth = auth;
    } catch(error) {
      console.error(error)
    }
  }

  signWith(provider) {
    signInWithPopup(this.auth, provider);
  }

  render() {
    return (
      <CenteredContainer>
        <StyledCard>
          <StyledButton onClick={() => this.signWith(providerGoogle)}>
            Sign in with Google
          </StyledButton>
          <StyledButton onClick={() => this.signWith(providerFacebook)}>
            Sign In with Facebook
          </StyledButton>
        </StyledCard>
      </CenteredContainer>
    );
  }
}
