import React, { useContext, useEffect } from "react";
import "./CaregiverPortal.css";
import { Context } from "../store/appContext";

export const CaregiverPortal = () => {
  const { store, actions } = useContext(Context);

  let getCaregiverInfo = async () => {
    let success = await actions.getCaregiverProfile();
    if (!success) {
      alert(
        "There was a problem retrieving your data. Please try again later!"
      );
    }
  };
  useEffect(() => {
    getCaregiverInfo();
  }, []); // Added 'actions' to the dependency array

  const handleReply = async (patientId, requestId, reply) => {
    let success = await actions.replyRequest(patientId, requestId, reply);
    if (success) {
      getCaregiverInfo();
    } else {
      alert(
        "An error ocurred while attempting to reply to this request! Please try agin later."
      );
    }
  };

  return (
    <div className="patient-portal">
      <h1>Welcome {store.caregiver?.email} Caregiver!</h1>
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
                ?.filter((item) => item.request_status == "Pending")
                .map((item, index) => {
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
                                Status: {item.request_status}
                              </li>
                            </ul>
                            <div className="btnGroup">
                              <button
                                onClick={() => {
                                  handleReply(
                                    item.patient.id,
                                    item.request_id,
                                    "accept"
                                  );
                                }}
                                className="btn btn-success m-1"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => {
                                  handleReply(
                                    item.patient.id,
                                    item.request_id,
                                    "deny"
                                  );
                                }}
                                className="btn btn-secondary m-1"
                              >
                                Deny
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="appointments-tab-pane"
            role="tabpanel"
            aria-labelledby="appointments-tab"
            tabindex="0"
          >
            <div>
              {store.caregiver?.caring_users?.map((item, index) => {
                console.log(item.is_active);
                return (
                  <div
                    className="card mb-3 mx-auto"
                    style={{ maxWidth: "540px" }}
                    key={index}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src="..."
                          className="img-fluid rounded-start"
                          alt="Patient"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <h5 className="card-title">{item.name}</h5>
                            </li>
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
                              Emergency Contact: {item.emergencyContact}
                            </li>
                            <li className="list-group-item">
                              Allergies: {item.allergies}
                            </li>
                            <li className="list-group-item">
                              Blood Type: {item.bloodType}
                            </li>
                            <li className="list-group-item">
                              Hobbies: {item.hobbies}
                            </li>
                            <li className="list-group-item">
                              Status: {item.is_active ? "Active" : "Inactive"}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="records-tab-pane"
            role="tabpanel"
            aria-labelledby="records-tab"
            tabindex="0"
          >
            <div>
              {store.caregiver?.requests
                .filter((item) => item.request_status == "Accepted")
                ?.map((item, index) => {
                  console.log(item.is_active);
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
                                {item.appointment_reason}
                              </li>

                              <li className="list-group-item">
                                Date and Time:
                                {new Date(item.date_time).toLocaleString()}
                              </li>
                              <li className="list-group-item">
                                Status:{" "}
                                <span
                                  className={
                                    item.request_status == "Accepted"
                                      ? "accepted"
                                      : "rejected"
                                  }
                                >
                                  {item.request_status}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            handleReply(
                              item.patient.id,
                              item.request_id,
                              "deny"
                            );
                          }}
                          className="btn btn-danger mx-5 w-75 mb-3"
                        >
                          Cancel Appointment
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabindex="0"
          >
            {/* Profile content */}
          </div>
          <div
            className="tab-pane fade"
            id="settings-tab-pane"
            role="tabpanel"
            aria-labelledby="settings-tab"
            tabindex="0"
          >
            {/* Settings content */}
          </div>
        </div>
      </div>
    </div>
  );
};
