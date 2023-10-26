// postsReducer.js or in your slice

import {
  ADD_POST,
  SET_POSTS,
  ADD_COMMENT,
  SET_COMMENTS,
} from "../actions/postsActions";

const initialState = {
  posts: [],
  comments: [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ], // Add this line for comments
  // ... other state
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ADD_COMMENT: // New case handler for adding a comment
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case SET_COMMENTS: // New case handler for setting comments
      return {
        ...state,
        comments: action.payload,
      };
    // ... other case handlers
    default:
      return state;
  }
};

export const selectPosts = (state) => state.posts.posts;
export const selectComments = (state) => state.posts.comments;
export default postsReducer;
