import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [currentZoom, setCurrentZoom] = useState(1);

  const handleMagnify = () => {
    if (currentZoom < 2) {
      setCurrentZoom(currentZoom + 0.1);
      document.body.style.zoom = currentZoom + 0.1;
    }
  };

  const handleZoomOut = () => {
    if (currentZoom > 0.5) {
      setCurrentZoom(currentZoom - 0.1);
      document.body.style.zoom = currentZoom - 0.1;
    }
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                {/* <li><hr class="dropdown-divider"></li> */}
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form class="d-flex">
            {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"> */}
            {/* <button class="btn btn-outline-success" type="submit"></button> */}
            <button class="btn btn-outline-success my-2 my-sm-0" id="magnify-button" type="button" onClick={handleMagnify}><i class="fas fa-search-plus"></i></button>
            <button class="btn btn-outline-success my-2 my-sm-0" id="zoom-out-button" type="button" onClick={handleZoomOut}><i class="fas fa-search-minus"></i></button>
          </form>
        </div>
      </div>
    </nav>
  );
};