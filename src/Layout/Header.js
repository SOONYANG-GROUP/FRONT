import Alarm from "../Components/Alarm/Alarm";
import { LoginModalBtn } from "../Components/Modal/LoginModal";
import { LoginModal } from "../Components/Modal/LoginModal";

const Header = ({ isLoggedIn, alarmCount }) => {
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
      <a
        href="/"
        className="d-flex align-items-center mb-2 mb-md-0 text-dark text-decoration-none"
      >
        <h1 className="my-0 mx-3">CampusCrew</h1>
      </a>
      <nav className="d-flex align-items-center">
        <ul className="nav">
          <li className="nav-item">
            <a href="/" className="nav-link px-2 link-secondary">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/roadmaps" className="nav-link px-2 link-dark">
              Roadmap
            </a>
          </li>
          <li className="nav-item">
            <a href="/projects" className="nav-link px-2 link-dark">
              Projects
            </a>
          </li>
          <li className="nav-item">
            <a href="/aptitudeTest" className="nav-link px-2 link-dark">
              AptitudeTest
            </a>
          </li>
          <li className="nav-item">
            {isLoggedIn ? (
              <a href="/users/profile" className="nav-link px-2 link-dark">
                Profile
              </a>
            ) : (
              <>
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="nav-link px-2 link-dark"
                  style={{ cursor: "pointer" }}
                >
                  Profile
                </a>
                <LoginModal />
              </>
            )}
          </li>
        </ul>
        <span className="ms-auto d-flex align-items-center">
          <Alarm alarmCount={alarmCount} />
          <LoginModalBtn isLoggedIn={isLoggedIn} />
        </span>
      </nav>
    </header>
  );
};

export default Header;
