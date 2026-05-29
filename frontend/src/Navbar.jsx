import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="logo">
          📄 Document Dashboard
        </div>

        {/* Horizontal Navigation - Visible on ALL devices */}
        <ul className="nav-links-horizontal">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
          <li>
            <Link to="/documents">Documents</Link>
          </li>
          <li>
            <Link to="/updatedocuments">Track Document Status</Link>
          </li>
        </ul>

        {/* Mobile Sidebar Menu - Shows When Toggle is Clicked */}
        <ul className={`nav-links-mobile ${isMenuOpen ? "active" : ""}`}>
          <li onClick={closeMenu}>
            <Link to="/">🏠 Home</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/upload">📤 Upload</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/documents">📄 Documents</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/updatedocuments">📋 Track Document Status</Link>
          </li>
        </ul>

        <button className="upload-btn">
          Register/Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;