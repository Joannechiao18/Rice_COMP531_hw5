import { useContext, useState } from "react";
import "./comments.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux"; // 1. Import useSelector
import { selectUser } from "../../reducer/authReducer";
import { addComment } from "../../actions/postsActions";
import { selectComments } from "../../reducer/postsReducer";
import styled from "styled-components";

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

const CommentButton = styled(BaseButton)`
  color: white;
  background-color: #938eef;
  margin-right: 5px;

  &:hover {
    background-color: #7a75d6;
  }
`;

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments); // Use the comments from Redux store
  const currentUser = useSelector(selectUser);
  const [inputValue, setInputValue] = useState("");

  const handleSendClick = () => {
    if (inputValue.trim() !== "") {
      const newComment = {
        id: comments.length + 1,
        desc: inputValue,
        name: currentUser.name,
        userId: currentUser.id,
        profilePicture: currentUser.profilePic,
      };

      dispatch(addComment(newComment));
      setInputValue("");
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <CommentButton onClick={() => handleSendClick()}>Comment</CommentButton>
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
