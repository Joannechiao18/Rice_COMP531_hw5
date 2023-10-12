import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";
import { PhotoCamera } from "@mui/icons-material"; // Import the PhotoCamera icon
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUser } from "../../reducer/authReducer";  


// Styled Components for the buttons
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

const CancelButton = styled(BaseButton)`
  color:black;
  background-color: #e3e0e0; // Mimicking Bootstrap btn-danger color
  margin-right: 5px; // Add some margin to the right of the Cancel button

  &:hover {
    background-color: #dedada; // Darker shade for hover effect
  }
`;

const PostButton = styled(BaseButton)`
  background-color: #938eef; // Mimicking Bootstrap btn-primary color
  color: white;

  &:hover {
    background-color: #7a75d6; // Darker shade for hover effect
  }
`;


const Share = ({ addNewPost }) => {
  //const { currentUser } = useContext(AuthContext);
  const currentUser = useSelector(selectUser);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const clearInputText = () => {
    setInputText("");
  };

  const handlePostClick = () => {
    if (inputText.trim() === "") {
      return;
    }

    const newPost = {
      id: Date.now(),
      name: currentUser.username,
      userId: currentUser.id,
      profilePic: currentUser.profilePic,
      desc: inputText,
      img: "", // You can add the image URL here if needed
    };

    addNewPost(newPost);
    clearInputText();
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind, ${currentUser.username}?`}
            value={inputText}
            onChange={handleInputChange}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} />
            <label htmlFor="file">
              <div className="item">
                <PhotoCamera /> {/* Use the PhotoCamera icon here */}
                <span>Add Image</span>
              </div>
            </label>
            {/*<div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
          </div>*/}
          </div>
          <div className="right">
              <PostButton onClick={handlePostClick}>
                Post
              </PostButton>
              <CancelButton onClick={clearInputText}>
                Cancel
              </CancelButton>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
