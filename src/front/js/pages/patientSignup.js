import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";


export const PatientSignUp = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	// State to capture form inputs
	const [formData, setFormData] = useState({
		name: "",
		date_of_birth: "",
		email: "",
		password: "",
		// is_active: "",
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
		const success = actions.patientSignUp(formData); // Example action
		console.log("Form submitted", formData);
		if (success) {
			navigate("/patient-login");

		} else {
			alert("There was a problem creating your account. Please try again later.")
		}
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
							{/* <div className="form-group my-4">
								<label htmlFor="phone"><strong>Phone Number</strong></label>
								<input
									type="tel"
									id="phone"
									value={formData.phone}
									onChange={handleChange}
									placeholder="Enter your phone number"
									className="form-control bg-light"
								/>
							</div> */}
							<div className="form-group my-4">
								<label htmlFor="password"><strong>Password</strong></label>
								<input
									type="text"
									id="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Enter your password"
									className="form-control bg-light"
								/>
							</div>


							<div className="form-group my-4">
								<label htmlFor="date_of_birth"><strong>Date Of Birth</strong></label>
								<input
									id="date_of_birth"
									value={formData.date_of_birth}
									onChange={handleChange}
									className="form-control bg-light"

								/>
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
