const Footer = () => {
  return (
    <div class="container">
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
          <a
            href="/"
            class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <svg class="bi" width="30" height="24">
              <use href="#bootstrap"></use>
            </svg>
          </a>
          <span class="mb-3 mb-md-0 text-muted">© 2023 Company, Inc</span>
        </div>

        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="me-3">
            <a className="text-muted" href="#">
              <svg className="bi" width="24" height="24">
                <use href="#twitter"></use>
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <svg className="bi" width="24" height="24">
                <use href="#instagram"></use>
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <svg className="bi" width="24" height="24">
                <use href="#facebook"></use>
              </svg>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
