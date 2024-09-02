const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			caregiver: null,
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
			requestCaregiver: async (caregiverId) => {
				let options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: 'Bearer ' + sessionStorage.getItem('token')
					},
					body: JSON.stringify({
						caregiver_id: caregiverId,
						request_status: "Pending"
					})
				};
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/request/caregiver`, options);
					if (response.status !== 200) {
						console.log("Failed to request caregiver", response.status);
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
			replyRequest: async (patientId, requestId, reply) => {
				let options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: 'Bearer ' + sessionStorage.getItem('token')
					},
					body: JSON.stringify({
						patientId: patientId,
						reply: reply,
						requestId: requestId
					})
				};
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/caregiver/request-reply`, options);
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
						fullname:caregiverdata.fullname, 
						password:caregiverdata.password,
						email :caregiverdata.email,
						phone :caregiverdata.phone,
						experience :caregiverdata.experience,
						qualifications :caregiverdata.qualifications,
						availability :caregiverdata.availability,
						location :caregiverdata.location,
					}),
				};

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/caregiver/signup`, options);

					if (response.status !== 200) {
						console.log("Login failed", response.status);
						return false;
					}

					const data = await response.json();
					console.log("Signup successful", data);
	

					return true;
				} catch (error) {
					console.log("Error during login", error);
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