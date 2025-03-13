// src/components/Menu.tsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./menu.css";

const Menu: React.FC = () => {
  return (
    <div>
      {/* Sidebar */}
      <header>
        <nav
          id="sidebarMenu"
          className="collapse d-lg-block sidebar collapse bg-white"
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link
                to="/dashboard"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-tachometer-alt fa-fw me-3"></i>
                <span>Inicio</span>
              </Link>
              <Link
                to="/transaccion"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-chart-area fa-fw me-3"></i>
                <span>Transacciones</span>
              </Link>
              <Link
                to="/categoria"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-lock fa-fw me-3"></i>
                <span>Categorias</span>
              </Link>
              <Link
                to="/categoria"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-chart-line fa-fw me-3"></i>
                <span>Informes</span>
              </Link>
              <Link
                to="/seo"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-chart-pie fa-fw me-3"></i>
                <span>Perfil</span>
              </Link>
              <Link
                to="/orders"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-chart-bar fa-fw me-3"></i>
                <span>Configuracion</span>
              </Link>
              <Link
                to="/international"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-globe fa-fw me-3"></i>
                <span>Ayuda</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Navbar */}
        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        >
          <div className="container-fluid">
            {/* Toggle button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>

            {/* Brand */}
            <Link to="/" className="navbar-brand">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="25"
                alt="MDB Logo"
                loading="lazy"
              />
            </Link>

            {/* Search form */}
            <form className="d-none d-md-flex input-group w-auto my-auto">
              <input
                autoComplete="off"
                type="search"
                className="form-control rounded"
                placeholder='Search (ctrl + "/" to focus)'
                style={{ minWidth: "225px" }}
              />
              <span className="input-group-text border-0">
                <i className="fas fa-search"></i>
              </span>
            </form>

            {/* Right links */}
            <ul className="navbar-nav ms-auto d-flex flex-row">
              {/* Notification dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-bell"></i>
                  <span className="badge rounded-pill badge-notification bg-danger">
                    1
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link to="/news" className="dropdown-item">
                      Some news
                    </Link>
                  </li>
                  <li>
                    <Link to="/another-news" className="dropdown-item">
                      Another news
                    </Link>
                  </li>
                  <li>
                    <Link to="/something-else" className="dropdown-item">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Icon */}
              <li className="nav-item">
                <Link to="/icon" className="nav-link me-3 me-lg-0">
                  <i className="fas fa-fill-drip"></i>
                </Link>
              </li>

              {/* Icon */}
              <li className="nav-item me-3 me-lg-0">
                <Link to="/github" className="nav-link">
                  <i className="fab fa-github"></i>
                </Link>
              </li>

              {/* Avatar dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                    className="rounded-circle"
                    height="22"
                    alt="Avatar"
                    loading="lazy"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="dropdown-item">
                      Configuracion
                    </Link>
                  </li>
                  <li>
                    <Link to="/logout" className="dropdown-item">
                      Cerrar Sesion
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main style={{ marginTop: "58px" }}>
        <div className="container pt-4">
          <Outlet />{" "}
          {/* Aquí se renderizará el contenido de las rutas anidadas */}
        </div>
      </main>
    </div>
  );
};

export default Menu;
