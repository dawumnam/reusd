import * as React from "react";
import logo from "../img/logo.png";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import axios from "axios";
import { Context } from "../App";

const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = React.useState(false);
  const { token, intervalId, intervalStatus, isSignedIn } = React.useContext(Context);
  const [tokens, setToken] = token;
  const [intervalIds, setIntervalId] = intervalId;
  const [isIntervalRunning, setIsIntervalRunning] = intervalStatus;
  const [isSigned, setIsSignedIn] = isSignedIn;

  const handleClick = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    const data = await axios.get("http://localhost:5000/signout", {
      withCredentials: true,
      validateStatus: () => true,
    });
    if (data.status === 200) {
      setToken("");
      clearInterval(intervalIds);
      setIsIntervalRunning(false);
      setIsSignedIn(false);
    }
  };

  const handleDropdownlist = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowNavbar(!showNavbar);
  };

  const reloadpage = () => {
    window.location.href = "/";
  };
  
    return (
      <nav className="navbar">
        <div className="nav-left">
          <ul className="nav-ul">
            <Link to="/" style={{ textDecoration: "none" }}>
              <ol className="nav-list">
                <FontAwesomeIcon onClick={reloadpage} icon={faHome} />
              </ol>
              
            </Link>
            {isSigned ? (
      <Link to="/sellmyproduct" style={{ textDecoration: "none" }}>
      <ol className="nav-list">
        <FontAwesomeIcon icon={faPlus} />
      </ol>
    </Link>
            ):null}
       {isSigned ? (
            <Link to="/Chat" style={{ textDecoration: "none" }}>
              <ol className="nav-list">
                <FontAwesomeIcon icon={faComment} />
              </ol>
            </Link>
              ):null}
          </ul>
        </div>
  
        <img className="logo" src={logo} alt="logo"></img>
  
        <div className="nav-right">
          <ul className="nav-ul">
            {isSigned ? (
             <ol className="nav-list-profilebtn" onClick={handleDropdownlist}>
             PROFILE
           </ol>
            ):null}
           
  
            {showNavbar ? (
              <div className="dropdown-Navbar">
                <Link to="/MyInfo" style={{ textDecoration: "none" }}>
                  <ol className="dropdown-Navbar-list">MyAccount</ol>
                </Link>
                <Link to="/SellingHistory" style={{ textDecoration: "none" }}>
                  <ol className="dropdown-Navbar-list">Selling History</ol>
                </Link>
              </div>
            ) : null} 
            {isSigned ? (<button className="signout-button" onClick={handleClick}>
                SIGN OUT
            </button>):null}
            {!isSigned ?(  <Link to="/Login" style={{ textDecoration: "none" }}>
              <ol className="nav-list-login-btn">LOGIN</ol>
            </Link>):null}
          </ul>
        </div>
      </nav>
    );
  
  
};

export default Navbar;
