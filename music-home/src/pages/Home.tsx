import { lazy } from "react";
import { useNavigate } from "react-router-dom";

import withAuthorization from "../HOC/withAuthorization";
import { logout } from "../auth";
const MusicLibrary = lazy(() => import('musicLibrary/MusicLibrary'));

import './Home.css';

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login")   
  };

  return (
    <>
      <nav className="ml-home-nav">
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <h1>Welcome to the Music App</h1>
      <MusicLibrary />
    </>
  );
}

const Home = withAuthorization(['user', 'admin'])(HomePage);

export default Home;