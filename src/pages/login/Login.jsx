import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { login } from "../../actions/authActions"; // Assuming you've stored it in an 'actions' folder
import profilePic from "../../assets/profile.png";

// Styled Components for the buttons
const LoginButton = styled.button`
  background-color: #938eef;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  &:hover {
    background-color: #7a75d6;
    animation: pulse 0.6s infinite;
  }
`;

const RegisterButton = styled(LoginButton)`
  background-color: #e3e0e0;
  color: black;

  &:hover {
    background-color: #dedada;
  }
`;

const Login = () => {
  //const { login: handleLogin } = useContext(AuthContext); // Renamed for clarity
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?username=${username}`
    );
    const users = await response.json();
    console.log("Parsed Users:", users);
    const user = users[0];

    if (user && user.address.street === password) {
      console.log("in");
      if (user) {
        // Transform the user object
        //user.name=user.username;
        user.zipcode = user.address.zipcode;
        user.password = user.address.street;
        delete user.address;
      }

      const userDetails = {
        id: user.id,
        username: username,
        password: user.password,
        zipcode: user.zipcode,
        email: user.email,
        phone: user.phone,
        profilePic: profilePic,
        // ... other attributes
      };

      console.log("before");
      dispatch(login(userDetails));
      console.log("after");
      navigate("/"); // Removed the duplicate navigate call
    } else {
      alert("Incorrect username or password");
    }
  };

  return isLoggedIn ? (
    <div className="text-center mt-5">Welcome, {username}!</div>
  ) : (
    <div className="register d-flex align-items-center vh-100">
      <div className="card mx-auto" style={{ maxWidth: "800px" }}>
        <div className="row g-0">
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5 text-white bg-primary">
            <h2 className="display-1 mb-4">Hello World.</h2>
            <span className="mb-3">First time?</span>
            <Link to="/register">
              <RegisterButton>REGISTER</RegisterButton>
            </Link>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center p-5">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control w-100"
                  placeholder="Password (Street Name)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                <LoginButton type="submit">LOGIN</LoginButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
