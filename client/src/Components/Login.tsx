import * as React from "react";
import '../Styles/Login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";
import { Context } from './../App';
import axios from "axios";
const date = new Date(Date.now());

const Login: React.FC = () => {
  const {token,isSignedIn} = React.useContext(Context);
  const [tokens,setTokens] = token;
  const [isSigned,setIsSignedIn] = isSignedIn;


  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = React.useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const data = await axios.post("http://localhost:5000/signin", userInfo, {
      withCredentials: true,
      validateStatus: () => true,
    });
    console.log(data);
    if (data.status === 200) {
      setIsSignedIn(true);
      setRedirect(true);
    }
  };
  if (redirect === true) {
    return <Redirect to="/" />;
  } 
  return (
    <div className="LoginPage">
      <div className="Login-container">
          <div className="LoginTitle">
            <h5>LOG IN</h5>
          </div>
        <form onSubmit={handleSubmit} className="LoginInputSection">
          <input
            className="login-input"
            type="email"
            autoFocus
            required
            placeholder="Email Address"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
          />
          <input
            className="login-input"
            type="password"
            autoFocus
            required
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserInfo({ ...userInfo, password: e.target.value });
            }}
          />
          <button type="submit" className="Loginbtn">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </form>
        <div className="additionInfo">
          <div className="forgot-password">
            <Link to="/forgotpassword" style={{ textDecoration: "none" }}>
              <p className="forgotpass"> Forgot Password?</p>
            </Link>
          </div>
          <div className="btn-to-Signup">
            Don't Have an account?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <span className="direct-to-signup"> Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default Login;
