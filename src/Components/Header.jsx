import { Container } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../assets/bookshow.png"; 
import "./Header.css";

function Header() {
  return (
    <>
      <header className="bookmyshow-header">
        <Container className="d-flex align-items-center justify-content-between gap-3">
          <Link to="/">
            <img src={logo} alt="BookMyShow" className="logo" />
          </Link>

          <div className="search-box d-flex align-items-center flex-grow-1 mx-3">
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for Movies and Events"
              className="search-input"
            />
          </div>

          <div className="d-flex align-items-center gap-3">
            <span>Surat ▾</span>
            <Link to="/add-movie" className="menu-link">Add Movie</Link>
          </div>
        </Container>
      </header>
    </>
  );
}

export default Header;
