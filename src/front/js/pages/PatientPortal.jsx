import React, { useEffect, useState, useContext } from "react";
import "../../styles/PatientPortal.css";
import { CaregiversList } from "../component/CaregiversList";
import { Context } from "../store/appContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faCheck, faUndo, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // Import the icons you need
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../component/userProfile";

export const PatientPortal = () => {
  const { store, actions } = useContext(Context);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      let success = await actions.getPatientProfile()

      const fetchAppointments = async () => {
        try {
          console.log("fetching appointments");
          await actions.getAppointments();
          setAcceptedAppointments(store.getPatientAppointments);
        } catch (error) {
          console.error("Failed to fetch appointments:", error);
        }
      };
      if (actions.checkSessionStorage() && success) {
        fetchAppointments();
        setRefresh(true)
      } else {
        navigate("/patient-login")
      }

    }

    fetchUserProfile()
  }, []);

  console.log("appointments in store", store.getPatientAppointments);

  // Function to format date without seconds
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Subtract 5 hours from the date
    date.setHours(date.getHours() - 5);

    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="patient-portal">
      <h1>Welcome {store.patient?.name}!</h1>
      <h3>What do you want to do today?</h3>
      <div className="container">
        <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="caregiver-tab"
              data-bs-toggle="tab"
              data-bs-target="#caregiver-tab-pane"
              type="button"
              role="tab"
              aria-controls="caregiver-tab-pane"
              aria-selected="true"
            >
              Look for a Caregiver
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="appointments-tab"
              data-bs-toggle="tab"
              data-bs-target="#appointments-tab-pane"
              type="button"
              role="tab"
              aria-controls="appointments-tab-pane"
              aria-selected="false"
            >
              Current Appointments
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
            >
              My Profile
            </button>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="caregiver-tab-pane"
            role="tabpanel"
            aria-labelledby="caregiver-tab"
            tabIndex="0"
          >
            <CaregiversList />
          </div>

          <div
            className="tab-pane fade"
            id="appointments-tab-pane"
            role="tabpanel"
            aria-labelledby="appointments-tab"
            tabIndex="0"
          >
            <h3>Your Accepted Appointments:</h3>
            {acceptedAppointments.length > 0 ? (
              acceptedAppointments.map((appointment) => (
                <div key={appointment.id} className="card shadow appointment-card mb-3">
                  <div className="card-body" style={{ color: "#212529" }}> {/* Explicitly set the text color */}
                    {/* Caregiver Information */}
                    <div className="caregiver-info d-flex align-items-center mb-3">
                      <img
                        src={appointment.caregiver.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                        alt={appointment.caregiver.name}
                        className="caregiver-image rounded-circle me-3"
                        style={{ width: "110px", height: "110px" }}
                      />
                      <div>
                        <li className="list-group-item fw-bold fs-4">{appointment.caregiver.name}</li>
                        <li className="list-group-item">
                          <h5 className="card-title">{appointment.caregiver.email}</h5>
                        </li>
                        {/* <button className="btn btn-outline-primary btn-sm mt-2">Contact</button> */}
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="appointment-info">
                      <li className="list-group-item fst-normal">
                        <strong>Date & Time:</strong> {formatDate(appointment.date_time)}
                      </li>
                      <li className="list-group-item fst-normal">
                        <strong>Reason:</strong> {appointment.appointment_reason}
                      </li>
                      <li className="list-group-item fst-normal">
                        <strong>Status:</strong> <span className={`badge ${appointment.request_status.toLowerCase()}`}>{appointment.request_status}</span>
                      </li>
                      <li className="list-group-item fst-normal">
                        <strong>Location:</strong> {appointment.caregiver.location}
                      </li>

                    </div>

                    {/* Actions */}
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <button className="btn btn-danger">Cancel</button>
                      <button className="btn btn-outline-secondary">Reschedule</button>
                    </div>

                    {/* Map Link */}
                    <button className="btn btn-link mt-3 w-100 text-center text-decoration-none">
                      <i className="fa-solid fa-map-location-dot me-2"></i> View on Map
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No accepted appointments at the moment.</p>
            )}
          </div>

          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabindex="0"
          >
            <UserProfile refresh={refresh} />
          </div>

        </div>
      </div>
    </div>
  );
};
