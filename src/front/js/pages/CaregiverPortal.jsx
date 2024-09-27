import React, { useContext, useEffect, useState } from "react";
import "./CaregiverPortal.css";
import { Context } from "../store/appContext";
import { CaregiverProfile } from "../component/caregiverProfile";
import { useNavigate } from "react-router-dom";


export const CaregiverPortal = () => {

  const { store, actions } = useContext(Context);
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate()


  let getCaregiverInfo = async () => {
    let success = await actions.getCaregiverProfile();
    if (!success) {
      alert(
        "There was a problem retrieving your data. Please try again later!"
      );
      navigate("/caregiver-login")

    } else {
      setRefresh(true)
    }
  };

  useEffect(() => {
    if (actions.checkSessionStorage()) {
      getCaregiverInfo();
    }
  }, []); // Added 'actions' to the dependency array

  const handleReply = async (patientId, requestId, reply) => {
    let success = await actions.replyRequest(patientId, requestId, reply);
    if (success) {
      getCaregiverInfo();
    } else {
      alert(
        "An error occurred while attempting to reply to this request! Please try again later."
      );
    }
  };

  // Function to format date without seconds
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Subtract 5 hours from the date
    date.setHours(date.getHours());

    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="patient-portal">
      <h1>Welcome {store.caregiver?.name.split(' ')[0]}!</h1>
      <h3>What do you want to do today?</h3>
      <div className="container">
        <ul
          className="nav nav-tabs justify-content-center"
          id="myTab"
          role="tablist"
        >
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
              Current Requests
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
              Patients
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
              Appointments
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

        {/* Current Requests */}
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="caregiver-tab-pane"
            role="tabpanel"
            aria-labelledby="caregiver-tab"
            tabindex="0"
          >
            <div>
              {store.caregiver?.requests
                ?.filter((item) => item.request_status === "Pending")
                .map((item, index) => {
                  return (
                    <div key={index} className="card p-3 shadow appointment-card mb-3">
                      <div className="card-body" style={{ color: "#212529" }}>
                        {/* Patient Information */}
                        <div className="patient-info d-flex align-items-center mb-3">
                          <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            alt="Patient"
                            className="patient-image rounded-circle me-3"
                            style={{ width: "110px", height: "110px" }}
                          />
                          <div>
                            <li className="list-group-item fw-bold fs-4">{item.patient.name}</li>
                            <li className="list-group-item">
                              <h5 className="card-title">{item.patient.email}</h5>
                            </li>
                            <li className="list-group-item">Phone: {item.patient.phone}</li>
                          </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="appointment-info">
                          <li className="list-group-item fst-normal">
                            <strong>Date & Time:</strong> {formatDate(item.date_time)}
                          </li>
                          <li className="list-group-item fst-normal">
                            <strong>Reason:</strong> {item.appointment_reason}
                          </li>
                          <li className="list-group-item fst-normal">
                            <strong>Status:</strong> <span className={`badge ${item.request_status.toLowerCase()}`}>{item.request_status}</span>
                          </li>
                        </div>

                        {/* Accept and Deny Buttons */}
                        <div className="d-flex justify-content-between align-items-center mt-3 px-5">
                          <button
                            className="btn btn-success"
                            onClick={() => handleReply(item.patient.id, item.request_id, 'accept')}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleReply(item.patient.id, item.request_id, 'deny')}
                          >
                            Deny
                          </button>
                        </div>

                        {/* Map Link */}
                        <button className="btn btn-link mt-3 w-100 text-center text-decoration-none">
                          <i className="fa-solid fa-map-location-dot me-2"></i> View on Map
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Patients tab */}
          <div
            className="tab-pane fade"
            id="appointments-tab-pane"
            role="tabpanel"
            aria-labelledby="appointments-tab"
            tabindex="0"
          >
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              {store.caregiver?.caring_users?.map((item, index) => {
                const collapseId = `flush-collapse-${index}`;
                const headingId = `flush-heading-${index}`;
                return (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={headingId}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${collapseId}`}
                        aria-expanded="false"
                        aria-controls={collapseId}
                      >
                        <h5 className="card-title">{item.name}</h5>
                      </button>
                    </h2>
                    <div
                      id={collapseId}
                      className="accordion-collapse collapse"
                      aria-labelledby={headingId}
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <ul className="list-group list-group-flush">
                          {/* <li className="list-group-item">
                            <h5 className="card-title">{item.name}</h5>
                          </li> */}
                          <li className="list-group-item">
                            Date of Birth: {item.date_of_birth}
                          </li>
                          <li className="list-group-item">
                            Email: {item.email}
                          </li>
                          <li className="list-group-item">
                            Phone: {item.phone}
                          </li>
                          <li className="list-group-item">
                            Emergency Contact: {item.emergency_contact}
                          </li>
                          <li className="list-group-item">
                            Allergies: {item.allergies}
                          </li>
                          <li className="list-group-item">
                            Blood Type: {item.blood_type}
                          </li>
                          <li className="list-group-item">
                            Hobbies: {item.hobbies}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Appointments tab */}
          <div
            className="tab-pane fade"
            id="records-tab-pane"
            role="tabpanel"
            aria-labelledby="records-tab"
            tabindex="0"
          >


            <div>
              {
                store.caregiver?.requests ?
                  store.caregiver?.requests
                    .filter((item) => item.request_status === "Accepted")
                    ?.map((item, index) => {
                      return (
                        <div
                          className="card mb-3 mx-auto"
                          style={{ maxWidth: "540px" }}
                          key={index}
                        >
                          <div className="row g-0">
                            <div className="col-md-6">
                              <div className="card-body">
                                <li className="list-group-item">
                                  <h5 className="card-title">
                                    {item.patient.name}
                                  </h5>
                                </li>
                                <li className="list-group-item">
                                  Email: {item.patient.email}
                                </li>
                                <li className="list-group-item">
                                  Phone: {item.patient.phone}
                                </li>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="card-body">
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item">
                                    Reason for the Appointment:{" "}
                                    <i className="float-end">
                                      {item.appointment_reason}
                                    </i>
                                  </li>

                                  <li className="list-group-item">
                                    Date and Time:{" "}
                                    <span className="float-end">
                                      {new Date(item.date_time).toLocaleString(
                                        "en-US",
                                        {
                                          year: "numeric",
                                          month: "2-digit",
                                          day: "2-digit",
                                          hour: "numeric",
                                          minute: "numeric",
                                          hour12: true,
                                        }
                                      )}
                                    </span>
                                  </li>
                                  <li className="list-group-item">
                                    Location: {"Austin"}
                                  </li>
                                  <li className="list-group-item">
                                    Status: {item.request_status}
                                  </li>
                                </ul>
                                <button
                                  onClick={() => {
                                    handleReply(
                                      item.patient.id,
                                      item.request_id,
                                      "deny"
                                    );
                                  }}
                                  className="btn btn-danger m-1"
                                >
                                  Cancel Appointment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : "no request at this time"
              }
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabindex="0"
          ><CaregiverProfile refresh={refresh} />

          </div>
          <div
            className="tab-pane fade"
            id="settings-tab-pane"
            role="tabpanel"
            aria-labelledby="settings-tab"
            tabindex="0"
          >
            <h3>Settings</h3>
            <p>Here you can manage your settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

