import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { Dropdown } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import { FilterTermContext } from "../../context/FilterTermContext";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducer/authReducer";  

const UpdateButton = styled.button`
  background-color: #938eef;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  font-size: small;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  &:hover {
    color: white;
    background-color: #7a75d6 !important;
    animation: pulse 0.6s infinite !important;
  }
`;

const Navbar = () => {
  //const { currentUser } = useContext(AuthContext);
  const currentUser = useSelector(selectUser);
  console.log("nav", currentUser);
  //const profilePic = useSelector(selectProfilePic);

  const [userHeadline, setUserHeadline] = useState(
    currentUser?.catchPhrase || "Default CatchPhrase"
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const { setFilterTerm } = useContext(FilterTermContext);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchIconClick = () => {
    if (!searchTerm) {
      navigate("/");
    } else {
      setFilterTerm(searchTerm);
    }
  };

  const handleUpdateHeadline = (newHeadline) => {
    setUserHeadline(newHeadline);
    setShowDropdown(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand" to="/">
            Hello World
          </Link>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip-profile">{userHeadline}</Tooltip>}
          >
            <div className="profile-icon">
              <AddReactionOutlinedIcon
                style={{ fontSize: 30, color: "#938eef", fontSize: 22 }}
              />
            </div>
          </OverlayTrigger>
        </div>

        <div className="d-flex mx-auto">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <SearchOutlinedIcon
              onClick={handleSearchIconClick}
              style={{ cursor: "pointer", color: "#938eef" }}
            />
          </form>
        </div>

        <div className="d-flex align-items-center">
          <Dropdown
            className="ms-3 profile-dropdown"
            show={showDropdown}
            onToggle={(isOpen) => setShowDropdown(isOpen)}
          >
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              className="btn-sm d-flex align-items-center profile-toggle"
            >
              <img
                src={currentUser.profilePic}
                alt=""
                className="rounded-cirlce profile-picture"
              />
              <span>{currentUser.username}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="custom-dropdown-menu">
              <Dropdown.Header>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <input
                    type="text"
                    value={userHeadline}
                    onChange={(e) => setUserHeadline(e.target.value)}
                    placeholder=""
                    className="form-control"
                    style={{ borderRadius: "8px" }}
                  />
                  <UpdateButton
                    type="submit"
                    onClick={() => handleUpdateHeadline(userHeadline)}
                  >
                    Update Headline
                  </UpdateButton>
                </div>
              </Dropdown.Header>

              <Dropdown.Divider />
              <Dropdown.Item
                className="d-flex justify-content-center align-items-center"
                onClick={() => navigate(`/profile/${currentUser.id}`)}
              >
                <SettingsOutlinedIcon style={{ marginRight: "5px" }} />
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                className="d-flex justify-content-center align-items-center"
                href="/login"
              >
                <LogoutOutlinedIcon style={{ marginRight: "5px" }} />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
