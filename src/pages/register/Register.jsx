import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./register.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import $ from 'jquery';
import 'bootstrap';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/authActions';
import profilePic from '../../assets/profile.png';

const RegisterButton = styled.button`
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

const LoginButton = styled(RegisterButton)`
  background-color: #e3e0e0;
  color: black;

  &:hover {
    background-color: #dedada;
  }
`;

const Register = () => {
  const dispatch = useDispatch(); // <-- Use this to dispatch actions
  //const { login: handleRegister } = useContext(AuthContext); // Renamed for clarity

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  const checkUserName = (inputValue) => {
    let errorFound = false;

    if (!(/^[a-z]*$/.test(inputValue[0]))) {
        setUserNameError('Must start with lower case.');
        errorFound = true;
    } else if (!(/^[a-z][A-Za-z0-9]*$/.test(inputValue))) {
        setUserNameError('Account name can only contain numbers and characters.');
        errorFound = true;
    } else {
        setUserNameError(''); 
    }

    if (errorFound) {
        $('[data-toggle="popover"]').popover('show');
    } else {
        $('[data-toggle="popover"]').popover('hide');
    }
  };

  const checkEmail = (emailValue) => {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))) {
        setEmailError("Enter email in this format: a@b.co.");
        $('[data-toggle="popover-email"]').popover('show');
    } else {
        setEmailError("");
        $('[data-toggle="popover-email"]').popover('hide');
    }
  };

  const checkPhone = (phoneValue) => {
    if (!(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phoneValue))) {
      setPhoneError("Enter phone in this format: 346-628-7744.");
      $('[data-toggle="popover-phone"]').popover('show');
    } else {
      setPhoneError(""); 
      $('[data-toggle="popover-phone"]').popover('hide');
    }
  };

  const checkAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    
    const age = today.getFullYear() - birthDate.getFullYear() - 
        (today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);

    if (age < 18) {
        setBirthdayError("Age must be older than 18.");
    } else {
        setBirthdayError("");
    }
  };

  const checkZipCode = (zipValue) => {
    if (!(/^\d{5}(-\d{4})?$/.test(zipValue))) {
        setZipCodeError("Enter zip in this format: 77030 or 77030-1234.");
    } else {
      setZipCodeError(""); 
    }
  };

  const checkPassword = (passwordValue) => {
    if (passwordValue === '') {
        setPasswordError("Enter password.");
    } else {
        setPasswordError(""); 
    }
  };

  const checkConfirmPassword = (confirmPassword) => {
    if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
    } else {
        setConfirmPasswordError(""); 
    }
  };

  useEffect(() => {
    // Initialize the Bootstrap popover 
    $('[data-toggle="popover"], [data-toggle="popover-email"], [data-toggle="popover-phone"], [data-toggle="popover-birthday"], [data-toggle="popover-zipcode"]'
      , '[data-toggle="popover-password"], [data-toggle="popover-confirmpassword"]').popover();
    
    if (userNameError) {
      $('[data-toggle="popover"]').popover('show');
    } else {
      $('[data-toggle="popover"]').popover('hide');
    }
    
    if (emailError) {
      $('[data-toggle="popover-email"]').popover('show');
    } else {
      $('[data-toggle="popover-email"]').popover('hide');
    }
  
    if (phoneError) {
      $('[data-toggle="popover-phone"]').popover('show');
    } else {
      $('[data-toggle="popover-phone"]').popover('hide');
    }

    if (birthdayError) {
      $('[data-toggle="popover-birthday"]').popover('show');
    } else {
      $('[data-toggle="popover-birthday"]').popover('hide');
    }

    if (zipCodeError) {
      $('[data-toggle="popover-zipcode"]').popover('show');
    } else {
      $('[data-toggle="popover-zipcode"]').popover('hide');
    }

    if (passwordError) {
      $('[data-toggle="popover-password"]').popover('show');
    } else {
      $('[data-toggle="popover-password"]').popover('hide');
    }

    if (confirmPasswordError) {
      $('[data-toggle="popover-confirmpassword"]').popover('show');
    } else {
      $('[data-toggle="popover-confirmpassword"]').popover('hide');
    }
    
    return () => {
      // Hide and destroy popovers to avoid memory leaks
      $('[data-toggle="popover"], [data-toggle="popover-email"], [data-toggle="popover-phone"], [data-toggle="popover-birthday"], [data-toggle="popover-zipcode"]'
      , '[data-toggle="popover-password"], [data-toggle="popover-confirmpassword"]').popover('hide').popover('dispose');
    };
  }, [username, email, phone, userNameError, emailError, phoneError, birthdayError, zipCodeError, passwordError, confirmPasswordError]);


  const handleNameChange = (e) => {
    const currentValue = e.target.value;
    setUsername(currentValue);
    checkUserName(currentValue);
  };

  const handleEmailChange = (e) => {
    const currentValue = e.target.value;
    setEmail(currentValue);
    checkEmail(currentValue);
  };

  const handlePhoneChange = (e) => {
    const currentValue = e.target.value;
    setPhone(currentValue);
    checkPhone(currentValue);
  };

  const handleZipCodeChange = (e) => {
    const currentValue = e.target.value;
    setZipCode(currentValue);
    checkZipCode(currentValue);
  };

  const handlePasswordchange = (e) => {
    const currentValue = e.target.value;
    setPassword(currentValue);
    checkPassword(currentValue);
  };

  const handleConfirmPasswordchange = (e) => {
    const currentValue = e.target.value;
    setConfirmPassword(currentValue);
    checkConfirmPassword(currentValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!userNameError && !emailError && !phoneError && !birthdayError
      && !zipCodeError && !passwordError && !confirmPasswordError){
      const user = {
        id: 11,
        username: username,
        email: email,
        phone: phone,
        //age: birthDate,
        zipcode: zipcode,
        password: password,
        profilePic: profilePic 
      };

      dispatch(register(user)); // <-- Use Redux to store the user data
      navigate('/');  
    }
  };

  return (
    <div className="register d-flex align-items-center vh-100">
      <div className="card mx-auto" style={{ maxWidth: '800px' }}>
        <div className="row g-0">
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5 text-white bg-primary">
            <h2 className="display-1 mb-4">Hello World.</h2>
            <span className="mb-3">Do you have an account?</span>
            <Link to="/login">
              <LoginButton>LOGIN</LoginButton>
            </Link>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center p-5">
            <h2 className="mb-4">Register</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
              <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={handleNameChange}
                    data-toggle="popover"
                    data-trigger="manual" // We'll handle the show/hide manually
                    data-content={userNameError}
                    data-placement="right" 
                  />
              </div>
              <div className="mb-3">
              <input
                  id="email"
                  type="email"
                  className="form-control w-100"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  data-toggle="popover-email"
                  data-trigger="manual"
                  data-content={emailError}
                  data-placement="right"
              />
              </div>
              <div className="mb-4">
              <input
                id="phone"
                type="text"
                className="form-control w-100"
                placeholder="Phone"
                value={phone}
                onChange={handlePhoneChange}
                data-toggle="popover-phone"
                data-trigger="manual"
                data-content={phoneError}
                data-placement="right"
              />
              </div>
              <div className="mb-4">
              <input 
                  type="date" 
                  value={birthDate} 
                  onChange={e => {
                    setBirthDate(e.target.value);
                    checkAge(e.target.value);
                }}
                  className="form-control"
                  data-toggle="popover-birthday"
                  data-trigger="manual"
                  data-content={birthdayError}
                  data-placement="right"
              />
              </div>
              <div className="mb-4">
              <input
                id="zipcode"
                type="text"
                className="form-control w-100"
                placeholder="Zipcode"
                value={zipcode}
                onChange={handleZipCodeChange}
                data-toggle="popover-zipcode"
                data-trigger="manual"
                data-content={zipCodeError}
                data-placement="right"
              />
              </div>
              <div className="mb-3">
              <input
                id="pass"
                type="password"
                className="form-control w-100"
                placeholder="Password"
                value={password}
                onChange={handlePasswordchange}
                data-toggle="popover-password"
                data-trigger="manual"
                data-content={passwordError}
                data-placement="right"
              />
              </div>
              <div className="mb-3">
              <input
                type="password"
                className="form-control w-100"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordchange}
                data-toggle="popover-confirmpassword"
                data-trigger="manual"
                data-content={confirmPasswordError}
                data-placement="right"
              />
              </div>
              <div className="d-flex justify-content-center">
                <RegisterButton type="submit">REGISTER</RegisterButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
