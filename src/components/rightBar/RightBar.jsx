import React, { useEffect, useState } from "react";
import "./rightBar.scss";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../reducer/authReducer";
import {
  addFollowedUser,
  removeFollowedUser,
  setFollowedUsers,
} from "../../reducer/followedUsersReducer";
import { selectFollowedUsers } from "../../reducer/followedUsersReducer";
import { ConstructionOutlined } from "@mui/icons-material";

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
  const currentUser = useSelector(selectUser);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [newFollowers, setNewFollowers] = useState([]);
  const [inputName, setInputName] = useState("");
  const currentUserID = currentUser.id;
  const dispatch = useDispatch();
  const followedUsers = useSelector(selectFollowedUsers);

  const [message, setMessage] = useState(null);

  useEffect(() => {
    const totalUsers = 10;

    if (currentUserID <= totalUsers) {
      // Check if followedUsersFromRedux is empty
      if (!followedUsers || followedUsers.length === 0) {
        const initialFollowedUserIds = [
          (currentUserID % totalUsers) + 1,
          ((currentUserID + 1) % totalUsers) + 1,
          ((currentUserID + 2) % totalUsers) + 1,
        ];

        fetch("https://jsonplaceholder.typicode.com/users")
          .then((response) => response.json())
          .then((data) => {
            const initialFollowedUsers = data.filter((user) =>
              initialFollowedUserIds.includes(user.id)
            );

            setOnlineFriends(initialFollowedUsers.map((user) => user.id));

            dispatch(setFollowedUsers(initialFollowedUsers));
          });
      } else {
        setOnlineFriends(followedUsers.map((user) => user.id));

        // If followedUsers is not empty, dispatch it to Redux
        console.log(followedUsers);
        dispatch(setFollowedUsers(followedUsers));
      }
    } else {
      setOnlineFriends([]);
    }
  }, [currentUserID, dispatch, followedUsers]);

  const handleUnfollow = (userToUnfollow) => {
    dispatch(removeFollowedUser(userToUnfollow));

    // Update the local states
    setOnlineFriends((prevFriends) =>
      prevFriends.filter((friend) => friend !== userToUnfollow)
    );
    setNewFollowers((prevFollowers) =>
      prevFollowers.filter((follower) => follower !== userToUnfollow)
    );
  };

  const handleAddFriend = async () => {
    if (inputName.trim() !== "") {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?name=${inputName}`
        );
        const newUser = await response.json();

        if (newUser && newUser.length > 0) {
          const userWithHeadline = {
            ...newUser[0],
            headline: "This is a default headline for a new friend.",
          };
          setNewFollowers((prevFollowers) => [
            ...prevFollowers,
            userWithHeadline,
          ]);
          dispatch(addFollowedUser(userWithHeadline));
          setInputName("");
          setMessage(null);
        } else {
          setMessage("User not found.");
        }
      } catch (error) {
        setMessage("There was an error fetching the user. Please try again.");
      }
    }
  };

  const allFriends = [...onlineFriends, ...newFollowers];

  return (
    <div className="rightBar d-flex flex-column p-2 bg-light border-left">
      <div className="customContainer">
        {message && <div className="alert alert-warning">{message}</div>}
        <h5 className="customTitle text-muted mb-3">Online Friends</h5>
        {allFriends.map((userId) => {
          const user = followedUsers.find((u) => u.id === userId); // Get the entire user object

          if (!user) {
            return null; // Return null if no user is found, or you can provide a default value or some error handling
          }

          return (
            <div className="mb-3 border-bottom pb-3" key={userId}>
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
                      {user.username} {/* Use Redux data */}
                    </p>
                  </div>
                  <div className="mt-0">
                    <UnfollowButton onClick={() => handleUnfollow(user)}>
                      {" "}
                      {/* Pass the entire user object */}
                      Unfollow
                    </UnfollowButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <h5 className="customTitle text-muted mb-3 mt-4">Add New Friend</h5>
        <div className="mb-3 d-flex">
          <input
            type="text"
            value={inputName}
            onChange={(e) => {
              setInputName(e.target.value);
              setMessage(null); // Clear the message when the user types
            }}
            placeholder="Enter friend's name"
            className="form-control mr-2"
            style={{ height: "30px", borderRadius: "20px" }}
          />
          <AddButton onClick={handleAddFriend}>Add</AddButton>
        </div>
      </div>
    </div>
  );
};
export default RightBar;
