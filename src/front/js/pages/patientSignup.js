import React from "react";
import "../../styles/patientSignup.css"

export const PatientSignUp =()=>{
    return(
        <div class="signup-container">
      <h2>Patient Sign Up</h2>
      <form>
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
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
                        placeholder="Enter your city"/>
        </div>
        <button class="patient-signup-button"type="submit">Sign Up</button>
      </form>

      <div class="form-footer">
        <p>Already have an account? <a href="#">Log in here</a>.</p>
      </div>
    </div>
    )
}