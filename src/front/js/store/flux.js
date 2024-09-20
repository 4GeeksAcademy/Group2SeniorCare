const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			caregiver: null,
			getPatientAppointments: [],
			successMessage: ""
			token: null,
			patient: null,

		},
		actions: {
			getCaregiverProfile: async () => {
				let options = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + sessionStorage.getItem('token')
					}
				};
				let response = await fetch(`${process.env.BACKEND_URL}/api/caregiver`, options);
				if (response.status !== 200) {
					console.log('Unable to access your account', response.status);
					return false;
				}
				let data = await response.json();
				console.log(data);
				setStore({ caregiver: data.caregiver });
				return true;
			},
			requestCaregiver: async (formData) => {
				let options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: 'Bearer ' + sessionStorage.getItem('token')
					},
					body: JSON.stringify({
						caregiver_id: formData.caregiverId,
						date_time:  formData.dateTime,
						appointment_reason: formData.appointmentReason,
						is_current: formData.is_current
					})
				};
				try {
					let response = await fetch(process.env.BACKEND_URL + "api/request-caregiver", options);
					if (response.status !== 200) {
						console.log("failed to request caregiver", response.status);
						setStore({ successMessage: "Failed to request Caregiver. Try again in an hour!" });
						return false;
					}
					let data = await response.json();
					console.log("Request sent.", data)
					setStore({ successMessage: "Request sent successfully." });
					return true
				} catch (error) {
					console.log("Error requesting Caregiver", error);
					return false;
				}
			},
			replyRequest: async (patientId, requestId, reply) => {
				let options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
						// "Authorization": "Bearer " + sessionStorage.getItem("token")
					},
					body: JSON.stringify({
						patientId: patientId,
						reply: reply,
						requestId: requestId
					})
				};
				try {
					let response = await fetch(process.env.BACKEND_URL + "api/caregiver/request-reply", options);

					if (response.status !== 200) {
						console.log("Failed to reply to request", response.status);
						return false;
					}
					let data = await response.json();
					console.log("Request sent.", data);
					return true;
				} catch (error) {
					console.log("Error requesting Caregiver", error);
					return false;
				}
			},
			// Get appointments without patient id
			getAppointments: async () => {
				let options = {
					headers: {
						"Content-Type": "application/json",
					}
				};
				try {
					let response = await fetch(`${process.env.BACKEND_URL}api/appointments`, options);
					if (response.status !== 200) {
						console.log("Failed to fetch appointments", response.status);
						return [];
					}
					let data = await response.json();
					setStore({ getPatientAppointments: data });  // Changed this line
					console.log("dataset in store", data);
					return data;  // Changed this line
				} catch (error) {
					console.log("Error fetching patient appointments", error);
					return [];
				}
			},

			getPatientProfile: async () => {
				let options = {
				  headers: {
					'Content-Type': 'application/json'
				  }
				};
				try {
				  let response = await fetch(`${process.env.BACKEND_URL}api/patient/profile`, options);
				  if (response.status !== 200) {
					console.log('Failed to fetch patient profile', response.status);
					return false;
				  }
				  let data = await response.json();
				  console.log('Patient profile fetched', data);
				  setStore({ patient: data.patient });
				  return data.patient;
				} catch (error) {
				  console.log('Error fetching patient profile', error);
				  return false;
				}
			},
			updateSuccessMessage: (newMessage) => {
				setStore({successMessage: newMessage})
			}
		},
			loginPatient: async (email, password) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login/user`, options);

					if (response.status !== 200) {
						console.log("Login failed", response.status);
						return false;
					}

					const data = await response.json();
					console.log("Login successful", data);
					setStore({ token: data.access_token });

					return true;
				} catch (error) {
					console.log("Error during login", error);
					return false;
				}
			},
			loginCaregiver: async (email, password) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login/caregiver`, options);

					if (response.status !== 200) {
						console.log("Login failed", response.status);
						return false;
					}

					const data = await response.json();
					console.log("Login successful", data);
					setStore({ token: data.access_token });

					return true;
				} catch (error) {
					console.log("Error during login", error);
					return false;
				}
			},
			loginCaregiver: async (email, password) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login/caregiver`, options);

					if (response.status !== 200) {
						console.log("Login failed", response.status);
						return false;
					}

					const data = await response.json();
					console.log("Login successful", data);
					setStore({ token: data.access_token });

					return true;
				} catch (error) {
					console.log("Error during login", error);
					return false;
				}
			},

			caregiverSignup: async (caregiverdata) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						fullname: caregiverdata.fullname,
						password: caregiverdata.password,
						email: caregiverdata.email,
						phone: caregiverdata.phone,
						experience: caregiverdata.experience,
						qualifications: caregiverdata.qualifications,
						availability: caregiverdata.availability,
						location: caregiverdata.location,
					}),
				};
			
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/caregiver/signup`, options);
			
					if (response.status !== 200) {
						console.log("Signup failed", response.status);
						return false;
					}
			
					const data = await response.json();
					console.log("Signup successful", data);
			
					return true;
				} catch (error) {
					console.log("Error during signup", error); // Corrected the log message
					return false;
				}
			},


			patientSignUp: async (patientdata) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name:patientdata.name,
						dob:patientdata.date_of_birth,
						email:patientdata.email,
						password:patientdata.password,
					}),
				};
			
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/signup`, options);
			
					if (response.status !== 200) {
						console.log("Signup failed", response.status);
						return false;
					}
			
					const data = await response.json();
					console.log("Signup successful", data);
			
					return true;
				} catch (error) {
					console.log("Error during signup", error); // Corrected the log message
					return false;
				}
			},
						getPatientProfile: async () => {
				let options = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + sessionStorage.getItem('token')
					}
				};
				let response = await fetch(`${process.env.BACKEND_URL}/api/user`, options);
				if (response.status !== 200) {
					console.log('Unable to access your account', response.status);
					return false;
				}
				let data = await response.json();
				console.log(data);
				setStore({ patient: data.user });
				return true;
			},
			getCaregiverProfile: async () => {
				let options = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + sessionStorage.getItem('token')
					}
				};
				let response = await fetch(`${process.env.BACKEND_URL}/api/caregiver`, options);
				if (response.status !== 200) {
					console.log('Unable to access your account', response.status);
					return false;
				}
				let data = await response.json();
				console.log(data);
				setStore({ caregiver: data.caregiver });
				return true;
			}
		}
	};
};
export default getState;