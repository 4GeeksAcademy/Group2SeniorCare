import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const SignUp = () => {
	const { store, actions } = useContext(Context);

	// State to capture form inputs
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		location: "",
		experience: "",
		qualifications: "",
		availability: ""
	});

	// Handle form input changes
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value
		});
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		// Call the action to send form data (e.g., to the backend)
		actions.signUp(formData); // Example action
		console.log("Form submitted", formData);
	};

	return (
		<div className="text-center mt-5">
			<div className="container">
				{/* Image Section */}
				<img src="https://i.ibb.co/s3gBtK4/banner-6617553-1280.jpg" alt="Patient" style={{ width: "100%", borderRadius: "10px 10px 0 0" }} />

				{/* Form Section */}
				<h1>Patient SignUp</h1>
				<div className="row d-flex justify-content-center">
					<div className="col-6 text-start">
						<form onSubmit={handleSubmit}>
							<div className="form-group my-4">
								<label htmlFor="full-name"><strong>Full Name</strong></label>
								<input
									type="text"
									id="fullName"
									value={formData.fullName}
									onChange={handleChange}
									placeholder="Enter your full name"
									className="form-control bg-light"
								/>
							</div>
							<div className="form-group my-4">
								<label htmlFor="email"><strong>Email</strong></label>
								<input
									type="email"
									id="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Enter your email"
									className="form-control bg-light"
								/>
							</div>
							<div className="form-group my-4">
								<label htmlFor="phone"><strong>Phone Number</strong></label>
								<input
									type="tel"
									id="phone"
									value={formData.phone}
									onChange={handleChange}
									placeholder="Enter your phone number"
									className="form-control bg-light"
								/>
							</div>
							<div className="form-group my-4">
								<label htmlFor="location"><strong>Location</strong></label>
								<input
									type="text"
									id="location"
									value={formData.location}
									onChange={handleChange}
									placeholder="Enter your location"
									className="form-control bg-light"
								/>
							</div>
							<div className="form-group my-4">
								<label htmlFor="experience"><strong>Experience Level</strong></label>
								<select
									id="experience"
									value={formData.experience}
									onChange={handleChange}
									className="form-control bg-light"
								>
									<option>Select your experience level</option>
									<option>Beginner</option>
									<option>Intermediate</option>
									<option>Expert</option>
								</select>
							</div>
							<div className="form-group my-4">
								<label htmlFor="qualifications"><strong>Qualifications</strong></label>
								<select
									id="qualifications"
									value={formData.qualifications}
									onChange={handleChange}
									className="form-control bg-light"
								>
									<option>Select your qualifications</option>
									<option>CNA</option>
									<option>RN</option>
									<option>Caregiving Certificate</option>
								</select>
							</div>
							<div className="form-group my-4">
								<label htmlFor="availability"><strong>Availability</strong></label>
								<select
									id="availability"
									value={formData.availability}
									onChange={handleChange}
									className="form-control bg-light"
								>
									<option>Select your availability</option>
									<option>Full-time</option>
									<option>Part-time</option>
									<option>Flexible</option>
								</select>
							</div>
							<div className="form-group d-flex justify-content-center">
								<button type="submit" className="btn btn-dark">Sign Up</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};