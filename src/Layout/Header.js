import { LoginModalBtn } from "../Components/Modal/LoginModal";
import { useEffect, useState } from "react";

const Header = ({ isLoggedIn }) => {
  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <svg
            className="bi me-2"
            width="40"
            height="32"
            role="img"
            aria-label="Bootstrap"
          ></svg>
        </a>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="/" className="nav-link px-2 link-secondary">
              Home
            </a>
          </li>
          <li>
            <a href="/roadmaps" className="nav-link px-2 link-dark">
              Roadmap
            </a>
          </li>
          <li>
            <a href="/projects" className="nav-link px-2 link-dark">
              Projects
            </a>
          </li>
          <li>
            <a href="/profile/1" className="nav-link px-2 link-dark">
              Profile
            </a>
          </li>
        </ul>
        <div className="col-md-3 text-end">
          <LoginModalBtn isLoggedIn={isLoggedIn} />
        </div>
      </header>
    </div>
  );
};

export default Header;
