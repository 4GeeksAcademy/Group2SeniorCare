const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			caregiver: null
		},
		actions: {
			getCaregiverProfile: async () => {
				let options = {
					headers: {
						'Content-Type': 'application/json',
						// Authorization: 'Bearer ' + sessionStorage.getItem('token')
					}
				}
				let response = await fetch(process.env.BACKEND_URL + 'api/caregiver', options)
				if (response.status != 200) {
					console.log('Unable to access your account', response.status)
					return false
				}
				let data = await response.json()
				console.log(data)
				setStore({ caregiver: data.caregiver })
				return true
			},
			requestCaregiver: async (caregiverId) => {
				let options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						// "Authorization": "Bearer " + sessionStorage.getItem("token")
					},
					body: JSON.stringify({
						caregiver_id: caregiverId,
						request_status: "Pending"
					})
				};
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/request/caregiver", options);
					if (response.status !== 200) {
						console.log("failed to request caregiver", response.status);
						return false;
					}
					let data = await response.json();
					console.log("Request sent.", data)
					return true
				} catch (error) {
					console.log("Error requesting Caregiver", error);
					return false;
				}
			},
			replyRequest: async(patientId, requestId ,reply)=>{
				let options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						// "Authorization": "Bearer " + sessionStorage.getItem("token")
					},
					body: JSON.stringify(
						{patientId:patientId,
						reply : reply,
						requestId : requestId}
					)
				};
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/caregiver/request-reply", options);
					if (response.status !== 200) {
						console.log("failed to reply to request", response.status);
						return false;
					}
					let data = await response.json();
					console.log("Request sent.", data)
					return true
				} catch (error) {
					console.log("Error requesting Caregiver", error);
					return false;
				}
			}
		}
	}
};
export default getState;
