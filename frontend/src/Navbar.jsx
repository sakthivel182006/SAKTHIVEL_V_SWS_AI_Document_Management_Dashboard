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
          <Link to="/updatedocuments">Track Status</Link>
        </li>
      </ul>

      <button className="upload-btn">
        Register/Login
      </button>
    </nav>
  );
}

export default Navbar;