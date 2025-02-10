import { useNavigate } from "react-router-dom";

import MusicLibrary from "musicLibrary/MusicLibrary";
import withAuthorization from "../HOC/withAuthorization";
import { logout } from "../auth";


function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login")   
  };

  return (
    <div>
      <nav>
      <button onClick={handleLogout}>Logout</button>
      </nav>
      <h1>Welcome to the Music App</h1>
      <MusicLibrary />
    </div>
  );
}

const Home = withAuthorization(['user', 'admin'])(HomePage);

export default Home;