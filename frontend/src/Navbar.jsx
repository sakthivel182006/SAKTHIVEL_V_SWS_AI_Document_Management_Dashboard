import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        📄 Document Dashboard
      </div>

      <ul className="nav-links">
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
          <Link to="/notifications">Notifications</Link>
        </li>
      </ul>

      <button className="upload-btn">
        Upload PDF
      </button>
    </nav>
  );
}

export default Navbar;