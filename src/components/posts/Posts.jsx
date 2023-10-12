import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { FilterTermContext } from '../../context/FilterTermContext';
import "./posts.scss";
import Post from "../post/Post";
import Share from "../share/Share";
import { useSelector } from 'react-redux'; // 1. Import useSelector
import { selectUser } from "../../reducer/authReducer";  
import { useDispatch } from 'react-redux';
import { addPost, setPosts } from '../../actions/postsActions'; // Adjust this import based on your file structure
import { selectPosts } from "../../reducer/postsReducer";


const Posts = () => {
  //const { currentUser } = useContext(AuthContext);
  const currentUser = useSelector(selectUser); // Adjust this based on your Redux store structure
  const posts = useSelector(selectPosts); // Adjust this based on your Redux store structure
  const dispatch = useDispatch();

  //const [posts, setPosts] = useState([]);
  const { filterTerm } = useContext(FilterTermContext);

  // Filtering the posts based on the filterTerm
  const filteredPosts = posts.filter(post => 
    post.name.toLowerCase().includes(filterTerm.toLowerCase()) || 
    post.desc.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const currentUserID = currentUser.id;

  useEffect(() => {
    if (currentUserID <= 10) {
        const fetchUsers = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const users = await response.json();
            const firstTenUsers = users.slice(0, 10);

            // Assigning profile pictures to the first 10 users
            const userImages = [
                "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
                "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
                "https://images.pexels.com/photos/4881650/pexels-photo-4881650.jpeg?auto=compress&cs=tinysrgb&w=1600",
            ];
            firstTenUsers.forEach((user, idx) => {
                user.profilePic = idx < 3 ? userImages[idx] : "https://via.placeholder.com/150"; // generic placeholder for the rest
            });

            // Define the default text value
            const defaultText = "This is the default text for every post.";

            // Fetch the posts for each user
            const userPostsPromises = firstTenUsers.map(async (user) => {
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
                const userPosts = await res.json();

                return userPosts.map((post, idx) => {
                    let postImage = null;

                    // Add images to the first three posts
                    if (idx === 0) {
                        postImage = "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600";
                    } else if (idx === 1) {
                        postImage = "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600";
                    } else if (idx === 2) {
                        postImage = "https://images.pexels.com/photos/4881650/pexels-photo-4881650.jpeg?auto=compress&cs=tinysrgb&w=1600";
                    }

                    // Add the default text to each post
                    const postText = defaultText;

                    return {
                        ...post,
                        name: user.name,
                        profilePic: user.profilePic,
                        img: postImage,
                        desc: postText, // Use the default text for all posts
                    };
                });
            });

            const allPosts = await Promise.all(userPostsPromises);
            const flattenedPosts = allPosts.flat();
            dispatch(setPosts(flattenedPosts));  // <-- Change this line
        };

        fetchUsers();
    } 
}, [currentUserID]);


  const addNewPost = (newPost) => {
    //setPosts([newPost, ...posts]);
    dispatch(addPost(newPost));  // Dispatching the action
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
