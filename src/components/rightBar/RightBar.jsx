import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../context/authContext";
import "./rightBar.scss";
import styled from "styled-components";
import { useSelector } from 'react-redux'; // 1. Import useSelector
import { selectUser } from "../../reducer/authReducer";  

// Styled Components for the buttons
const BaseButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
`;

const AddButton = styled(BaseButton)`
  color: white;
  background-color: #938eef;
  margin-right: 5px;

  &:hover {
    background-color: #7a75d6;
  }
`;

const UnfollowButton = styled(BaseButton)`
  color: white;
  background-color: #d36c5c;
  margin-right: 5px;

  &:hover {
    background-color: #a22b2b;
  }
`;

const RightBar = () => {
  //const { currentUser } = useContext(AuthContext);
  const currentUser = useSelector(selectUser); // Adjust this based on your Redux store structure
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [inputName, setInputName] = useState("");
  const currentUserID = currentUser.id;

  useEffect(() => {
    if (currentUserID <= 10) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          let followedUserIds;

          const totalUsers = 10;

          followedUserIds = [
            (currentUserID % totalUsers) + 1,
            ((currentUserID + 1) % totalUsers) + 1,
            ((currentUserID + 2) % totalUsers) + 1,
          ];

          const followedUsers = data.filter((user) =>
            followedUserIds.includes(user.id)
          );
          setOnlineFriends(followedUsers);
        });
    } else {
      setOnlineFriends([]);
    }
  }, [currentUserID]);

  const handleUnfollow = (userToUnfollow) => {
    setOnlineFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.id !== userToUnfollow.id)
    );
  };

  const handleAddFriend = () => {
    if (inputName.trim() !== "") {
      const newFriend = {
        id: new Date().getTime(),
        name: inputName,
        img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
        headline: "This is a default headline for a new friend."
      };
      setOnlineFriends((prevFriends) => [...prevFriends, newFriend]);
      setInputName("");
    }
  };

  return (
    <div className="rightBar d-flex flex-column p-2 bg-light border-left">
      <div className="customContainer">
        <h5 className="customTitle text-muted mb-3">Online Friends</h5>
        {onlineFriends.map((user) => (
          <div className="mb-3 border-bottom pb-3" key={user.id}>
            <div className="d-flex">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="rounded-circle mr-2"
                style={{ width: "40px", height: "40px" }}
              />
              <div>
                <div>
                  <p className="mb-1" style={{ fontSize: "15px" }}>
                    {user.name}
                  </p>
                  {user.headline && <p style={{ fontSize: "12px", color: "grey" }}>{user.headline}</p>}
                </div>
                <div className="mt-0">
                  <UnfollowButton onClick={() => handleUnfollow(user)}>
                    Unfollow
                  </UnfollowButton>
                </div>
              </div>
            </div>
          </div>
        ))}

        <h5 className="customTitle text-muted mb-3 mt-4">Add New Friend</h5>
        <div className="mb-3 d-flex">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter friend's name"
            className="form-control mr-2"
            style={{ height: "30px", borderRadius: "20px" }}
          />
          <AddButton onClick={() => handleAddFriend()}>Add</AddButton>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
