import React from "react";
import "./style.css";
import Logo from "../../assets/logo.png";
const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          <img src={Logo} alt="Ki Happ" className="logo" />
        </a>
        <ul className="navbar-nav ul">
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
          <li className="nav-item">
            <a href="/profile" className="nav-link">
              Perfil
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
