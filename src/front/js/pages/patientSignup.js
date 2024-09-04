import React, { useState } from "react";
import "../../styles/patientSignup.css"

export const PatientSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/user/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.status !== 200) {
        console.log("sign up failed", response.status);
        return;
      }
      const data = await response.json();
      console.log('sign up successful', data)
    } catch (error) {
      console.log("error during sign up", error)
    }
  };
  return (
    <div class="signup-container">
      <h2>Patient Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div class="form-group">
          <label for="dob">Date of Birth</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter your city"/>
        </div>
        <button class="patient-signup-button"type="submit">Sign Up</button>
      </form>

      <div class="form-footer">
        <p>Already have an account? <a href="#">Log in here</a>.</p>
      </div>
    </div >
  )
}