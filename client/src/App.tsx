import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Sellproduct from "./Components/Sellproduct";
import EditProduct from "./Components/EditProduct";
import DetailProduct from "./Components/DetailProduct";
import Chat from "./Components/Chat";
import SilentRefresh from "./Components/utils/SilentRefresh";
import MyInfo from "./Components/MyInfo";
import SellingHistory from "./Components/SellingHistory";

export const Context = React.createContext<any>({});

const App: React.FC = () => {
  const [token, setToken] = React.useState("");
  const [isIntervalRunning, setIsIntervalRunning] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState(0);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  //console.log(token,isIntervalRunning, intervalId);

  return (
    <Context.Provider
      value={{
        token: [token, setToken],
        intervalStatus: [isIntervalRunning, setIsIntervalRunning],
        intervalId: [intervalId, setIntervalId],
        isSignedIn: [isSignedIn,setIsSignedIn],
      }}
    >
      <SilentRefresh />
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Login" component={Login} />
            <Route path="/EditProduct" component={EditProduct} />
            <Route path="/sellmyproduct" component={Sellproduct} />
            <Route path="/DetailProduct" component={DetailProduct} />
            <Route path="/Chat" component={Chat} />
            <Route path="/signup" component={Signup} />
            <Route path="/MyInfo" component={MyInfo} />
            <Route path="/SellingHistory" component={SellingHistory} />
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
};

export default App;
