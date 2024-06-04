import "./index.css";
import {  withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { FcConferenceCall } from "react-icons/fc";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  const onClickLogout = () => {
    const { history } = props;
    Cookies.remove("jwt_token");
    const keysToRemove = ["sessionsList", "username", "tagsList"]; // Array of keys to remove in localStorage
    keysToRemove.forEach((item) => localStorage.removeItem(item));
    history.replace("/login");
  };


  return (
    <Nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-large-container">
          <Nav.Item>
            <NavLink exact to="/" className="nav-link" activeClassName="active">
              <FcConferenceCall className="icon" />
            </NavLink>
          </Nav.Item>
          <ul className="nav-menu">
            <Nav.Item className="nav-menu-item">
              <NavLink
                exact
                to="/"
                className="nav-link"
                activeClassName="active"
              >
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item className="nav-menu-item">
              <NavLink
                exact
                to="/dashboard"
                className="nav-link"
                activeClassName="active"
              >
                Dashboard
              </NavLink>
            </Nav.Item>
            <Nav.Item className="nav-menu-item">
              <NavLink
                exact
                to="/view-status"
                className="nav-link"
                activeClassName="active"
              >
                View Status
              </NavLink>
            </Nav.Item>
            <Nav.Item className="nav-menu-item">
              <NavLink
                exact
                to="/upload-paper"
                className="nav-link"
                activeClassName="active"
              >
                Upload
              </NavLink>
            </Nav.Item>
            <Nav.Item className="nav-menu-item">
              <NavLink
                exact
                to="/notification"
                className="nav-link"
                activeClassName="active"
              >
                Notification
              </NavLink>
            </Nav.Item>
            <Nav.Item className="nav-menu-item">
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </Nav.Item>

            {/* <li className="nav-menu-item">
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li> */}
          </ul>
        </div>
      </div>
    </Nav>
  );
};

export default withRouter(Header);
