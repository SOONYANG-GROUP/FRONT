import { LoginModal, LoginModalBtn } from "../Modal/LoginModal";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link" href="/battles">
                  프로젝트
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/champions">
                  로드맵
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/summoners">
                  플레이어
                </a>
              </li>
            </ul>
            <LoginModalBtn />
          </div>
        </div>
      </nav>
      <LoginModal />
    </>
  );
};

export default Header;
