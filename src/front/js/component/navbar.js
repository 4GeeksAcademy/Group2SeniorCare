import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">Home |</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/patient-login">Patient Login |</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/caregiver-login">Caregiver Login |</Link>
            </li>
          </ul>
        </div>
        <div class="ms-auto">
            <Link class="btn btn-primary" to="/join-patient">Join as a patient</Link>
          </div>
      </div>
    </nav>
  );
};
