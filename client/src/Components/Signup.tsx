import * as React from "react";
import "../Styles/Signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";
import { Context } from './../App';
import axios from "axios";

const Signup: React.FC = () => {
  const {isSignedIn} = React.useContext(Context);
  const [countries, setCountries] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [isSigned,setIsSignedIn] = isSignedIn;
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    city: "",
  });
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    const getCountries = async () => {
      const country = await axios.get("http://localhost:5000/getCountries", {
        withCredentials: true,
        validateStatus: () => true,
      });
      if (country.status === 200) {
        let countrydata = country.data;
        setCountries(countrydata);
      } else {
        console.log("error");
      }
    };
    getCountries();
  }, []);

  //Handle submit when the form is submitted
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const data = await axios.post("http://localhost:5000/signup", userInfo, {
      withCredentials: true,
      validateStatus: () => true,
    });
    if (data.status === 200) {
      setIsSignedIn(true);

      setRedirect(true);
    }
  };
  if (redirect === true) {
    return <Redirect to="/" />;
  }

  //When country is selected
  const handleCountryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    const country = await axios.get(
      `http://localhost:5000/Country/${e.target.value}`,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    if (country.status === 200) {
      let countrydata = country.data;
      setUserInfo({ ...userInfo, country: countrydata[0].name });
      const states = await axios.get(
        `http://localhost:5000/getStates/${countrydata[0].id}`,
        {
          withCredentials: true,
          validateStatus: () => true,
        }
      );
      if (states.status === 200) {
        let statesdata = states.data;
        setStates(statesdata);
      } else {
        console.log("error!");
      }
    } else {
      console.log("error!");
    }
  };

  //When state is selected
  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const state = await axios.get(
      `http://localhost:5000/State/${e.target.value}`,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    if (state.status === 200) {
      let statedata = state.data;
      setUserInfo({ ...userInfo, state: statedata[0].name });
      const cities = await axios.get(
        `http://localhost:5000/getCities/${statedata[0].id}`,
        {
          withCredentials: true,
          validateStatus: () => true,
        }
      );
      if (cities.status === 200) {
        let citiesdata = cities.data;
        setCities(citiesdata);
      } else {
        console.log("error!");
      }
    } else {
      console.log("error!");
    }
  };

  //When city is selected
  const handleCityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const city = await axios.get(
      `http://localhost:5000/City/${e.target.value}`,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    if (city.status === 200) {
      let citydata = city.data;
      setUserInfo({ ...userInfo, city: citydata[0].name });
    } else {
      console.log("error!");
    }
  };

  return (
    <div className="SignupPage">
      <div className="Signup-container">
        <div className="SignupTitle">
          <h5>SIGN UP</h5>
        </div>
        <form onSubmit={handleSubmit} className="SignupInputSection">
          <input
            className="Signup-input"
            type="text"
            autoFocus
            required
            placeholder="First Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserInfo({ ...userInfo, firstName: e.target.value });
            }}
          />
          <input
            className="Signup-input"
            type="text"
            autoFocus
            required
            placeholder="Last Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserInfo({ ...userInfo, lastName: e.target.value });
            }}
          />
          <input
            className="Signup-input"
            type="email"
            autoFocus
            required
            placeholder="Email Address"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
          />

          <input
            className="Signup-input"
            type="password"
            autoFocus
            required
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserInfo({ ...userInfo, password: e.target.value });
            }}
          />
          <select className="Signup-select" onChange={handleCountryChange}>
            {countries &&
              countries.map((country: any, index) => (
                <option
                  className="Signup-select-option"
                  key={index}
                  value={country.id}
                >
                  {country.name}
                </option>
              ))}
          </select>
          <select className="Signup-select" onChange={handleStateChange}>
            {states &&
              states.map((state: any, index) => (
                <option
                  className="Signup-select-option"
                  key={index}
                  value={state.id}
                >
                  {state.name}
                </option>
              ))}
          </select>
          <select className="Signup-select" onChange={handleCityChange}>
            {cities &&
              cities.map((city: any, index) => (
                <option
                  className="Signup-select-option"
                  key={index}
                  value={city.id}
                >
                  {city.name}
                </option>
              ))}
          </select>
          <button type="submit" className="Signupbtn">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </form>
        <div className="additionInfo">
          <div className="btn-to-Signup">
            Already have account?
            <Link to="/Login" style={{ textDecoration: "none" }}>
              <span className="direct-to-login"> Log In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
