import {UserContext} from "../../globals/user/UserContext";
import "./WelcomePage.scss";
import {Navigate} from "react-router-dom";
import React from "react";
import {type UserContextType} from "../../globals/user/interfaces";

class WelcomePage extends React.Component<{}> {
  static contextType = UserContext;

  render(): JSX.Element {
    const {isLoggedIn} = this.context as UserContextType;

    if (isLoggedIn) {
      return <Navigate to="/conversations" />;
    }

    return (
      <div className="welcome-page">
        <h1>Welcome to the Unicorn Chat</h1>
        <p>
          Enter a world of wonders and spark connections! With a unique username
          and password, unlock the gate to our Enchanted Realm. Delight in
          one-to-one conversations, where messages appear in real-time, making
          each chat magical. Join now and let the mystical conversations begin!
          🦄💬✨
        </p>
        <a href="login" className="login-link">
          Login
        </a>
      </div>
    );
  }
}

export default WelcomePage;
