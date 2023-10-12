import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useSelector } from 'react-redux';
import { selectUser } from "../../reducer/authReducer";  


const LeftBar = () => {
  //const { currentUser } = useContext(AuthContext);
  const currentUser = useSelector(selectUser);


  return (
    <div className="leftBar bg-light sticky-top">
      <div className="container py-4">
        <div className="d-flex flex-column align-items-start mb-4">
          <div className="d-flex align-items-center mb-3">
            <img src={currentUser.profilePic} alt="" className="rounded-circle" style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
            <span className="ml-2">{currentUser.username}</span>
          </div>
          <div className="d-flex align-items-center mb-3">
            <img src={Friends} alt="" className="rounded-circle" style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
            <span className="ml-2">Friends</span>
          </div>
          { /* ... rest of the items ... */ }
        </div>
        <hr />
        <div className="d-flex flex-column align-items-start mb-4">
          { /* ... rest of the sections ... */ }
        </div>
      </div>
    </div>
  );
};


export default LeftBar;
