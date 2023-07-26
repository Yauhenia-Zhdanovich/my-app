import {useEffect} from "react";
import {useUser} from "../../globals/user/UserContext";
import "./WelcomePage.scss";
import {useNavigate} from "react-router-dom";

export default function WelcomePage(): JSX.Element {
  const {isLoggedIn} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && navigate("/conversations");
  }, [isLoggedIn]);

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
