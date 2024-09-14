import React, { useContext, useEffect, useState } from 'react';
import './CaregiverPortal.css';
import { Context } from '../store/appContext';

export const CaregiverPortal = () => {
    const { store, actions } = useContext(Context);
    const [authenticated, setAuthenticated] = useState(null);
    let getCaregiverInfo = async () => {
        let success = await actions.getCaregiverProfile();
        if (!success) {
            alert('There was a problem retrieving your data. Please try again later!');
        }
    };
    useEffect(() => {

        getCaregiverInfo();
    }, []); // Added 'actions' to the dependency array

    const handleReply = async (patientId, requestId, reply) => {
        let success = await actions.replyRequest(patientId, requestId, reply)
        if (success) {
            getCaregiverInfo()
        } else {
            alert("An error ocurred while attempting to reply to this request! Please try agin later.")
        }
    }

    useEffect(() => {
        let authenticate = async () => {
            let success = await actions.getCaregiverProfile()
            if (success) {
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        }
        authenticate()
    }, [])

    return (
        <div>
            {authenticated === null ? (
                <div>Loading...</div>
            ) : authenticated === false ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="alert alert-danger text-center" role="alert">
                        <h4 className="alert-heading">Access Denied</h4>
                        <p>You must be loggend in as a caregiver to access this page.</p>
                        <hr />
                        <Link to="/patient-caregiver"> <a className="btn btn-danger">Back to Login</a></Link>

                    </div>
                </div>
            ) : authenticated === true ? (
                <div>
                    <h1>Welcome Caregiver!</h1>
                    <h3>Here are your current requests:</h3>
                    <div>

                        {store.caregiver?.requests?.map((item, index) => {
                            return (
                                <div className="card mb-3" style={{ maxWidth: '540px' }} key={index}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src="..." className="img-fluid rounded-start" alt="Patient" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <h5 className="card-title">{item.patient.name}</h5>
                                                    </li>
                                                    <li className="list-group-item">Email: {item.patient.email}</li>
                                                    <li className="list-group-item">Phone: {item.patient.phone}</li>
                                                    <li className="list-group-item">Time: {item.request_time}</li>
                                                    <li className="list-group-item">Status: {item.request_status}</li>


                                                </ul>
                                                <div className="navbar"><button onClick={() => { handleReply(item.patient.id, item.request_id, "accept") }} className="btn btn-success">Accept</button> <button onClick={() => { handleReply(item.patient.id, item.request_id, "deny") }} className="btn btn-secondary">Deny</button></div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    <h3>Current Patients:</h3>
                    <div>
                        {store.caregiver?.caring_users?.map((item, index) => {
                            console.log(item.is_active)
                            return (
                                <div className="card mb-3" style={{ maxWidth: '540px' }} key={index}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src="..." className="img-fluid rounded-start" alt="Patient" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <h5 className="card-title">{item.name}</h5>
                                                    </li>
                                                    <li className="list-group-item">Date of Birth: {item.date_of_birth}</li>
                                                    <li className="list-group-item">Email: {item.email}</li>
                                                    <li className="list-group-item">Phone: {item.phone}</li>
                                                    <li className="list-group-item">Emergency Contact: {item.emergencyContact}</li>
                                                    <li className="list-group-item">Allergies: {item.allergies}</li>
                                                    <li className="list-group-item">Blood Type: {item.bloodType}</li>
                                                    <li className="list-group-item">Hobbies: {item.hobbies}</li>
                                                    <li className="list-group-item">Status: {item.is_active ? 'Active' : 'Inactive'}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <h3>Here are your appointments for this week:</h3>
                    <div>Appointments</div>
                </div>
            ) : (
                    <div>
                        <h1>There seems to be an error retrieving this page, please comeback later.</h1>
                        <Link to="/"> <a className="btn btn-danger">Back to Home</a></Link>
                    </div>
                )
            }
        </div>
    );
};