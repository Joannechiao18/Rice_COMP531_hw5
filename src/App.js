import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useState, useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createGlobalStyle } from 'styled-components';
import { FilterTermContext } from './context/FilterTermContext';
import { useSelector } from 'react-redux';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
  }
`;

function App() {
  const { currentUser } = useSelector(state => state.auth);
  //const { currentUser, setCurrentUser} = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [filterTerm, setFilterTerm] = useState('');


  const Layout = ({ children }) => (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <GlobalStyle />
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          {/*{children}  {/* Render the child components */}
          <Outlet /> 
        </div>
        <RightBar />
      </div>
    </div>
  );

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return <Layout>{children}</Layout>;  // Render children inside the Layout
  };

  return (
    <FilterTermContext.Provider value={{ filterTerm, setFilterTerm }}>
      <Router>
        <Routes>
          {/* Unprotected Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
  
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </FilterTermContext.Provider>
  );  
}

export default App;
