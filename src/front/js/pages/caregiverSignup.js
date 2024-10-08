import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";


export const SignUp = () => {
	const { store, actions } = useContext(Context);


	const navigate = useNavigate();

	// State to capture form inputs
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		location: "",
		experience: "",
		qualifications: "",
		availability: "",
		location: "",
		gender: ""

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

		const success = actions.caregiverSignup(formData); // Example action
		console.log("Form submitted", formData);
		if (success) {
			navigate("/caregiver-login");

		} else {
			alert("There was a problem creating your account. Please try again later.")
		}
	};

	return (
		<div className="text-center mt-5">
			<div className="container">
				{/* Image Section */}
				<img src="https://i.ibb.co/s3gBtK4/banner-6617553-1280.jpg" alt="Caregiver" style={{ width: "100%", borderRadius: "10px 10px 0 0" }} />

				{/* Form Section */}
				<h1>Become a Caregiver</h1>
				<div className="row d-flex justify-content-center">
					<div className="col-6 text-start">
						<form onSubmit={handleSubmit}>
							<div className="form-group my-4">
								<label htmlFor="name"><strong>Full Name</strong></label>
								<input
									type="text"
									id="name"
									value={formData.name}
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
							<div className="form-group my-2">
								<label htmlFor="password"><strong>Password</strong></label>
								<input
									type="password"
									id="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Enter your password"
									className="form-control bg-light"
								/>
							</div>
							<div className="form-group my-2">
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
								<label htmlFor="experience"><strong>Select your years of experience</strong></label>
								<select
									id="experience"
									value={formData.experience}
									onChange={handleChange}
									className="form-control bg-light"
								>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
									<option>6</option>
									<option>7</option>
									<option>8</option>
									<option>9</option>
									<option>10</option>
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

							<div className="form-group my-4">
								<label htmlFor="gender"><strong>Gender</strong></label>
								<select
									id="gender"
									value={formData.gender}
									onChange={handleChange}
									className="form-control bg-light"
								>
									<option>Select gender</option>
									<option>Male</option>
									<option>Female</option>

								</select>
							</div>
							<div className="form-group">
								<button type="submit" className="btn btn-dark">Sign Up</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};