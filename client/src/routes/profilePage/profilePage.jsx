import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const navigate = useNavigate();
  const {updateUser, currentUser} = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      // clear local storage
      updateUser(null)
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    currentUser && (
      <div className='profilePage'>
        <div className='details'>
          <div className='wrapper'>
            <div className='title'>
              <h1>User Information</h1>
              <Link to='/profile/update'>
                <button>Update Profile</button>
              </Link>
            </div>
            <div className='info'>
              <span>
                Avatar:
                <img src={currentUser.data.avatar || "/logo.png"} alt='' />
              </span>
              <span>
                Username: <b>{currentUser.data.username}</b>
              </span>
              <span>
                E-mail: <b>{currentUser.data.email}</b>
              </span>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className='title'>
              <h1>My List</h1>
              <Link to='/add'>
                <button>Create New Post</button>
              </Link>
            </div>
            <List />
            <div className='title'>
              <h1>Saved List</h1>
            </div>
            <List />
          </div>
        </div>
        <div className='chatContainer'>
          <div className='wrapper'>
            <Chat />
          </div>
        </div>
      </div>
    )
  );
}

export default ProfilePage;
