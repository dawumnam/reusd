import * as React from "react";
import { Context } from "../../App";
import axios from "axios";

const SilentRefresh: React.FC = () => {
  const { token, intervalId, intervalStatus, isSignedIn } = React.useContext(Context);
  const [tokens, setToken] = token;
  const [intervalIds, setIntervalId] = intervalId;
  const [isIntervalRunning, setIsIntervalRunning] = intervalStatus;
  const [isSigned,setIsSignedIn] = isSignedIn;

  const getAccessToken = async () => {
    const data = await axios.get("http://localhost:5000/accesstoken", {
      withCredentials: true,
      validateStatus: () => true,
    });
    if (data.status === 200) {
      setToken(data.data.token);
      setIsSignedIn(true);
    }
  };

  React.useEffect(() => {
    if (tokens === "" && isIntervalRunning === false) {
      getAccessToken();
      setIntervalId(setInterval(getAccessToken, 1000 * 60 * 30));
      setIsIntervalRunning(true);
    }
  }, []);
  return null;
};
export default SilentRefresh;
