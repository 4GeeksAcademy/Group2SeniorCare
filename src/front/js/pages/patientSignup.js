import React, { useState } from "react";
import "../../styles/patientSignup.css"


export const PatientSignUp = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    password: "",
    city: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };


  return (
    <div class="signup-container">
      <h2>Patient Sign Up</h2>
      <form>
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => {
              handleChange(e);
              console.log(formData.fullName, ": is the input value", e.target.id, ",: is the input property name")
            }}
            name="name"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div class="form-group">
          <label for="dob">Date of Birth</label>
          <input type="date" id="dob" name="dob" required />
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter your city" />
        </div>
        <button class="patient-signup-button" type="submit" onClick={() => actions.createPatient(formData)}>Sign Up</button> 
        {/* This onClick will send the information to Flux where you will have a function that will make the fetch request to the API and create a user or reject */}
      </form>

      <div class="form-footer">
        <p>Already have an account? <a href="#">Log in here</a>.</p>
      </div>
    </div>
  )
}