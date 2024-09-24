const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			caregiver: null,
			patient: null,
			getPatientAppointments: [],
			successMessage: "",
			token: null,
			patients: [],
			recipes: [],

		},
		actions: {
			checkSessionStorage: () => {
				if(sessionStorage.getItem("token")){
					return true
				}
				return false
			},
			getCaregiverProfile: async () => {
				// const token = localStorage.getItem("token");
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
				console.log(data, "caregiver profile");
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
						date_time: formData.dateTime,
						appointment_reason: formData.appointmentReason,
						is_current: formData.is_current
					})
				};
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/request-caregiver", options);
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
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("token")
					},
					body: JSON.stringify({
						patientId: patientId,
						reply: reply,
						requestId: requestId
					})
				};
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/caregiver/request-reply", options);

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
						Authorization: "Bearer " + sessionStorage.getItem("token")
					}
				};
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/appointments`, options);
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

		
			updateSuccessMessage: (newMessage) => {
				setStore({ successMessage: newMessage })
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
					sessionStorage.setItem("token", data.token)

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
					sessionStorage.setItem("token", data.access_token)

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
						name: caregiverdata.name,
						password: caregiverdata.password,
						email: caregiverdata.email,
						phone: caregiverdata.phone,
						experience: caregiverdata.experience,
						qualifications: caregiverdata.qualifications,
						availability: caregiverdata.availability,
						location: caregiverdata.location,
						gender: caregiverdata.gender
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
						name: patientdata.name,
						date_of_birth: patientdata.date_of_birth,
						email: patientdata.email,
						password: patientdata.password,
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

			updatePatientProfile: async (patientdata) => {
				const options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("token")
					},
					body: JSON.stringify(patientdata),
				};

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user`, options);

					if (response.status !== 200) {
						console.log("Edit failed", response.status);
						return false;
					}

					const data = await response.json();
					console.log("Edit successful", data);

					getActions().getPatientProfile()

					return true;
				} catch (error) {
					console.log("Error during Edit", error); // Corrected the log message
					return false;
				}
			},
			updateCaregiverProfile: async (caregiverdata) => {
				const options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("token")
					},
					body: JSON.stringify(caregiverdata),
				};

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/caregiver`, options);

					if (response.status !== 200) {
						console.log("Edit failed", response.status);
						return false;
					}

					const data = await response.json();
					console.log("Edit successful", data);

					getActions().getCaregiverProfile()

					return true;
				} catch (error) {
					console.log("Error during Edit", error); // Corrected the log message
					return false;
				}
			},

			recipeApi: async () => {
				let options = {
					headers: {
							'x-rapidapi-key': `${process.env.RECIPES_API}`,
							'x-rapidapi-host': 'tasty.p.rapidapi.com'
					}
				};
				// let response = await fetch(`${process.env.BACKEND_URL}/api/user`, options);
				let response = await fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes", options);
				if (response.status !== 200) {
					console.log('Unable to access recipes', response.status);
					return false;
				}
				let data = await response.json();
				console.log(data,"recipes");
				setStore({ recipes: data.results });
				return true;
				

			},




		}
	};
};
export default getState;