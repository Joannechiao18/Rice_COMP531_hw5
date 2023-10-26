// Posts.js
import React, { useEffect, useContext } from "react";
import "./posts.scss";
import Post from "../post/Post";
import Share from "../share/Share";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../reducer/authReducer";
import { addPost, setPosts } from "../../actions/postsActions";
import { selectPosts } from "../../reducer/postsReducer";
import { selectFollowedUsers } from "../../reducer/followedUsersReducer";
import { FilterTermContext } from "../../context/FilterTermContext";

const Posts = () => {
  const currentUser = useSelector(selectUser);
  const posts = useSelector(selectPosts) || [];
  const dispatch = useDispatch();
  const currentUserID = currentUser.id;
  const followedUsers = useSelector(selectFollowedUsers);
  const { filterTerm = "" } = useContext(FilterTermContext);

  // Filtering the posts based on the filterTerm
  const filteredPosts = posts.filter((post) => {
    return (
      (post.name
        ? post.name.toLowerCase().includes(filterTerm.toLowerCase())
        : false) ||
      (post.desc
        ? post.desc.toLowerCase().includes(filterTerm.toLowerCase())
        : false)
    );
  });

  useEffect(() => {
    const userImages = [
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/4881650/pexels-photo-4881650.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ];

    // Extract IDs from the followedUsers objects
    const followedUserIds = followedUsers
      .filter((user) => user.id !== currentUserID)
      .map((user) => user.id);

    // Combine initial followedUserIds with the ones added from RightBar, and also include the current user
    const allFollowedUserIds = [
      ...new Set([...followedUserIds, currentUserID]),
    ];

    const fetchDetailsAndPosts = async () => {
      const allPosts = [];

      // Loop through each user's ID in allFollowedUserIds and fetch their posts
      for (let userId of allFollowedUserIds) {
        // Fetch user data to get the user's name

        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        const clonedResponse = userResponse.clone();

        // For debugging
        const responseText = await clonedResponse.text();

        const userData = await userResponse.json();

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const userPosts = await response.json();
        // Add profilePic and user name details to each post
        const postsWithDetails = userPosts.map((post) => {
          return {
            ...post,
            profilePic: userImages[userId % userImages.length],
            username: userData.username, // Use the name from the user data
            desc: post.title,
            body: post.body,
          };
        });

        allPosts.push(...postsWithDetails);
      }

      dispatch(setPosts(allPosts));
    };

    fetchDetailsAndPosts();
  }, [currentUserID, followedUsers]);

  const addNewPost = (newPost) => {
    dispatch(addPost(newPost));
  };

  return (
    <div className="posts container mt-5">
      <Share addNewPost={addNewPost} />
      <div className="row">
        {filteredPosts.map((post) => (
          <div className="col-12 mb-5" key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
