import React from "react";
import "./style.css";
import Logo from "../../assets/logo.png";
import TkContext from "../../context/TkdContext";
import { LoggedUser } from "./LoggedUser";
const Header = () => {
  const { user } = React.useContext(TkContext);
  return (
    <header className="header">
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          <img src={Logo} alt="Ki Happ" className="logo" />
        </a>
        <ul className="navbar-nav ul flex items-center">
          <li className="nav-item">
            <a href="/tournaments" className="nav-link">
              Tournaments
            </a>
          </li>
          <li className="nav-item">
            <a href="/tournaments" className="nav-link">
              About
            </a>
          </li>
          {user && user.id ? (
            <li className="nav-item">
             <LoggedUser />
            </li>
          ) : (
            <li className="nav-item">
              <a href="/login" className="nav-link">
                Entar
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
