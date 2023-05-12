import Alarm from "../Components/Alarm/Alarm";
import { LoginModalBtn } from "../Components/Modal/LoginModal";
import { LoginModal } from "../Components/Modal/LoginModal";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoDesign from "../assets/images/LogoDesign.png";
// import teamwork from "../assets/images/teamwork.png";
const Header = ({ isLoggedIn, alarmCount }) => {
  const [isRoom, setIsRoom] = useState();
  const location = useLocation().pathname;

  useEffect(() => {
    if (location.includes("/room")) {
      setIsRoom(true);
    }
  }, []);

  if (isRoom) {
    return <></>;
  }

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
      <a
        href="/"
        className="d-flex align-items-center mb-2 mb-md-0 text-dark text-decoration-none mx-4"
      >
        {/* <h1 className="my-0 mx-3 title">CampusCrew</h1> */}
        {/* <img src={teamwork} alt="icon" style={{ width: "100px" }} /> */}
        <img src={LogoDesign} alt="icon" style={{ width: "400px" }} />
      </a>
      <nav className="d-flex align-items-center mx-5">
        <ul className="nav">
          <li className="nav-item">
            <a href="/" className="nav-link px-2 link-secondary">
              <h6>Home</h6>
            </a>
          </li>
          <li className="nav-item">
            <a href="/roadmaps" className="nav-link px-2 link-dark">
              <h6>Roadmap</h6>
            </a>
          </li>
          <li className="nav-item">
            <a href="/projects" className="nav-link px-2 link-dark">
              <h6>Projects</h6>
            </a>
          </li>
          {/* <li className="nav-item">
            <a href="/aptitudeTest" className="nav-link px-2 link-dark">
              AptitudeTest
            </a>
          </li> */}
          <li className="nav-item">
            {isLoggedIn ? (
              <a href="/users/profile" className="nav-link px-2 link-dark">
                <h6>Profile</h6>
              </a>
            ) : (
              <>
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="nav-link px-2 link-dark"
                  style={{ cursor: "pointer" }}
                >
                  <h6>Profile</h6>
                </a>
                <LoginModal />
              </>
            )}
          </li>
        </ul>
        <span className="ms-auto d-flex align-items-center">
          {isLoggedIn ? (
            <>
              <Alarm alarmCount={alarmCount} />
            </>
          ) : (
            <></>
          )}

          <LoginModalBtn isLoggedIn={isLoggedIn} />
        </span>
      </nav>
    </header>
  );
};

export default Header;
