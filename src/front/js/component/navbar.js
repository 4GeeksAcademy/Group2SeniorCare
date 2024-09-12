import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      < div className="container-fluid d-flex justify-content-between" >
        <div className="d-flex align-items-center" >
          <h1 className="text-white" > CareConnect</h1 >
        </div >
        <button className="navbar-toggler" type="button" onClick={handleToggle} >
          <span className="navbar-toggler-icon" ></span >
        </button >
        <div className={navbarOpen ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home |</Link>
            </li >
            <li className="nav-item" >
              <Link className="nav-link" to="/patient-login" > Patient Login |</Link >
            </li >
            <li className="nav-item" >
              <Link className="nav-link" to="/caregiver-login" > Caregiver Login |</Link >
            </li >
            <li className="nav-item" >
              <Link className="nav-link" to="/about-us" > About Us |</Link >
            </li >
          </ul >

        </div >
      </div >
    </nav >
  );
};
