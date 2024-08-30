import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <h1 class="text-white">WeCare</h1>
        </div>
        <button class="navbar-toggler" type="button" onClick={handleToggle}>
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class={navbarOpen ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">Home |</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/patient-login">Patient Login |</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/caregiver-login">Caregiver Login |</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/about-us">About Us |</Link>
            </li>
          </ul>
          <Link class="btn btn-primary ms-2 text-white" style={{ backgroundColor: "#6c5ce7" }} to="/join-patient">Join as a patient</Link>
        </div>
      </div>
    </nav>
  );
};
