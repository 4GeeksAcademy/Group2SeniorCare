import React from "react";
import "./PatientPortal.css"; 
import { CaregiversList } from "../component/CaregiversList";

export const PatientPortal = () => {
    return (
        <div className="patient-portal">
            <h1>Welcome Patient!</h1>
            <h3>What do you want to do today?</h3>
            <div className="container">
                <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="caregiver-tab" data-bs-toggle="tab" data-bs-target="#caregiver-tab-pane" type="button" role="tab" aria-controls="caregiver-tab-pane" aria-selected="true">
                            Look for a Caregiver
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="appointments-tab" data-bs-toggle="tab" data-bs-target="#appointments-tab-pane" type="button" role="tab" aria-controls="appointments-tab-pane" aria-selected="false">
                            Current Appointments
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="records-tab" data-bs-toggle="tab" data-bs-target="#records-tab-pane" type="button" role="tab" aria-controls="records-tab-pane" aria-selected="false">
                            Medical Records
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                            See my Profile
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-tab-pane" type="button" role="tab" aria-controls="settings-tab-pane" aria-selected="false">
                            Settings
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="caregiver-tab-pane" role="tabpanel" aria-labelledby="caregiver-tab" tabindex="0">
                        <CaregiversList />
                    </div>
                    <div className="tab-pane fade" id="appointments-tab-pane" role="tabpanel" aria-labelledby="appointments-tab" tabindex="0">
                        {/* Appointments content */}
                    </div>
                    <div className="tab-pane fade" id="records-tab-pane" role="tabpanel" aria-labelledby="records-tab" tabindex="0">
                        {/* Medical Records content */}
                    </div>
                    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                        {/* Profile content */}
                    </div>
                    <div className="tab-pane fade" id="settings-tab-pane" role="tabpanel" aria-labelledby="settings-tab" tabindex="0">
                        {/* Settings content */}
                    </div>
                </div>
            </div>
        </div>
    );
};
