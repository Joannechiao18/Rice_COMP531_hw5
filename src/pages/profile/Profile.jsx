import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditProfileModal from "../../components/modal/EditProfileModal";
import { AuthContext } from "../../context/authContext";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import "./profile.scss";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from "../../reducer/authReducer";  
import { login } from "../../actions/authActions";
import styled from 'styled-components';

const BaseButton = styled.button`
  width:auto;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  font-weight:600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
`;

const EditButton = styled(BaseButton)`
  color:white;
  background-color: #938eef; // Mimicking Bootstrap btn-danger color
  margin-right: 5px; // Add some margin to the right of the Cancel button

  &:hover {
    background-color: #7a75d6; // Darker shade for hover effect
  }
`;

const Profile = () => {
  //const { currentUser, setCurrentUser } = useContext(AuthContext);
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProfile = (formData) => {
    console.log("check data", formData);
    dispatch(login({
      ...currentUser,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      zipcode: formData.zipcode
    }));
    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleUploadProfilePicture = () => {
    setTimeout(() => {
      dispatch(login({
        ...currentUser,
        profilePic: "https://via.placeholder.com/150",
      }));
      setIsModalOpen(false);
    }, 1000);
  };


  return (
    <div className="profile container mt-4">
      <Link to="/">
        <ArrowBackIosIcon className="back-button" />
      </Link>
      <div className="row mt-5">
        <div className="col-12 text-center mt-3">
          <div className="profile-pic-wrapper">
            <img
              src={
                currentUser.profilePic ||
                "https://via.placeholder.com/150"
              }
              alt={currentUser.username}
              className="img-fluid rounded-circle profile-pic"
            />
            <input 
              type="file" 
              id="profile-pic-input" 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
              accept="image/*" 
            />
            <label htmlFor="profile-pic-input" className="profile-picture-label">
              <AddAPhotoIcon style={{fontSize:18, color: "#938eef"}}/>
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4 text-center">
        </div>
        <div className="col-4 text-center">
          <h3><strong>{currentUser.username}</strong></h3>
          <p><EmailOutlinedIcon /> {currentUser.email}</p>
          <p><PhoneIcon /> {currentUser.phone}</p>
          <p><PlaceIcon />{currentUser.zipcode}</p>
          <p><VisibilityOffIcon />{currentUser.password && '*'.repeat(currentUser.password.length)}</p>
          <EditButton onClick={handleEditClick}>
                Edit
          </EditButton>
        </div>
        <div className="col-4 text-center">
        </div>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        user={currentUser}
        onUpdate={handleUpdateProfile}
      />
    </div>
  );
};

export default Profile;
