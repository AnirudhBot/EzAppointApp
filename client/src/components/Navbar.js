import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Navbar(props) {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      id="nav"
      style={{ padding: "0px" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="https://img.icons8.com/nolan/50/find-clinic.png" />
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="d-flex flex-row-reverse">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  {props.login}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="btn shadow-none"
                  onClick={props.togglemode}
                >
                  {props.m}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propsType = {
  title: PropTypes.string,
  about: PropTypes.string,
  a: PropTypes.string,
  m: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Set title here",
  about: "About",
  a: "a",
};
