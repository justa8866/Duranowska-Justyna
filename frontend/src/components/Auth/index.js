import React from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import app, { auth } from "../../common/firebase";
import {
  CenteredContainer,
  StyledCard,
  StyledButton,
} from "./Auth";

const providerGoogle = new GoogleAuthProvider();
export default class Login extends React.Component {
  app = null;
  auth = null;

  state = {
    email: '',
    password: '',
  }

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

  handleLoginRegister = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(this.auth, this.state.email, this.state.password);
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        await createUserWithEmailAndPassword(this.auth, this.state.email, this.state.password);
      } else {
        console.error(error);
      }
    }
  }

  render() {
    return (
      <CenteredContainer>
        <StyledCard>
          <form onSubmit={this.handleLoginRegister}>
            <input type="email" placeholder="Email" name="email" required onChange={event => this.setState({ email: event.target.value })} />
            <input type="password" placeholder="Password" name="password" required onChange={event => this.setState({ password: event.target.value })} />
            <StyledButton type="submit">Login/Register</StyledButton>
          </form>
          <StyledButton onClick={() => this.signWith(providerGoogle)}>
            Sign in with Google
          </StyledButton>
        </StyledCard>
      </CenteredContainer>
    );
  }
}
