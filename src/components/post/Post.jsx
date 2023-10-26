import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  //TEMPORARY
  const liked = false;

  const toggleComments = () => {
    setCommentOpen((prevState) => !prevState);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.username}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <h2>{post.desc}</h2> {/* Displaying the title here */}
          <p>{post.body}</p> {/* Displaying the body here */}
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>

          <div className="item" onClick={toggleComments}>
            <TextsmsOutlinedIcon />
            {commentOpen ? "Hide Comments" : "Show Comments"} (12)
          </div>

          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
          <div className="item">
            <CreateOutlinedIcon />
            Edit
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
