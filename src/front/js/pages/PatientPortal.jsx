import React, { useEffect, useState, useContext } from "react";
import "./PatientPortal.css";
import { CaregiversList } from "../component/CaregiversList";
import { Context } from "../store/appContext";

export const PatientPortal = () => {
  const { store, actions } = useContext(Context);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log("fetching appointments");
        await actions.getAppointments();
        setAcceptedAppointments(store.getPatientAppointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, []);
  
  console.log("appointments in store", store.getPatientAppointments);

  return (
    <div className="patient-portal">
      <h1>Welcome Patient!</h1>
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
              id="records-tab"
              data-bs-toggle="tab"
              data-bs-target="#records-tab-pane"
              type="button"
              role="tab"
              aria-controls="records-tab-pane"
              aria-selected="false"
            >
              Medical Records
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
              See my Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="settings-tab"
              data-bs-toggle="tab"
              data-bs-target="#settings-tab-pane"
              type="button"
              role="tab"
              aria-controls="settings-tab-pane"
              aria-selected="false"
            >
              Settings
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
                <div key={appointment.id} className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row g-0">
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{appointment.caregiver.name}</h5>
                        <h5>{appointment.caregiver.email}</h5>
                        <p>Date and Time: {new Date(appointment.date_time).toLocaleString()}</p>
                        <p>Reason: {appointment.appointment_reason}</p>
                        <p>Status: {appointment.request_status}</p>
                        <p>Location: {appointment.caregiver.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No accepted appointments at the moment.</p>
            )}
          </div>

          <div
            className="tab-pane fade"
            id="records-tab-pane"
            role="tabpanel"
            aria-labelledby="records-tab"
            tabIndex="0"
          >
            Hello Medical Records
          </div>

          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex="0"
          >
            {/* Profile content */}
          </div>

          <div
            className="tab-pane fade"
            id="settings-tab-pane"
            role="tabpanel"
            aria-labelledby="settings-tab"
            tabIndex="0"
          >
            {/* Settings content */}
          </div>
        </div>
      </div>
    </div>
  );
};
