import React, { useState } from "react";

export const SignUp = () => {
	// State to store form data locally
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		location: "",
		experience: "",
		qualifications: "",
		availability: ""
	});

	
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value 
		});
	};

	
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form Data Submitted: ", formData);

		
		localStorage.setItem("caregiverData", JSON.stringify(formData));
		alert("Form data saved locally!");
	};

	return (
		<div className="text-center mt-5">
			<div className="container">
				{/* Image Section */}
				<img
					src="/path/to/your/image.png"
					alt="Caregiver"
					style={{ width: "100%", borderRadius: "10px 10px 0 0" }}
				/>

				{/* Form Section */}
				<h1>Become a Caregiver</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="full-name">Full Name</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							value={formData.fullName}
							onChange={handleChange}
							placeholder="Enter your full name"
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Enter your email"
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="phone">Phone Number</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							placeholder="Enter your phone number"
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="location">Location</label>
						<input
							type="text"
							id="location"
							name="location"
							value={formData.location}
							onChange={handleChange}
							placeholder="Enter your location"
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="experience">Experience Level</label>
						<select
							id="experience"
							name="experience"
							value={formData.experience}
							onChange={handleChange}
							className="form-control"
						>
							<option>Select your experience level</option>
							<option>Beginner</option>
							<option>Intermediate</option>
							<option>Expert</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="qualifications">Qualifications</label>
						<select
							id="qualifications"
							name="qualifications"
							value={formData.qualifications}
							onChange={handleChange}
							className="form-control"
						>
							<option>Select your qualifications</option>
							<option>CNA</option>
							<option>RN</option>
							<option>Caregiving Certificate</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="availability">Availability</label>
						<select
							id="availability"
							name="availability"
							value={formData.availability}
							onChange={handleChange}
							className="form-control"
						>
							<option>Select your availability</option>
							<option>Full-time</option>
							<option>Part-time</option>
							<option>Flexible</option>
						</select>
					</div>

					<div className="form-group">
						<button type="submit" className="btn btn-dark">
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
