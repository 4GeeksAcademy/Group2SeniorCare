import React, { useState, useContext } from 'react';
import {Context} from "../store/appContext.js"
// import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import './PatientPortal.css'
import { CaregiversList } from '../component/CaregiversList';
import { Link } from 'react-router-dom';

export const PatientPortal = () => {
    const [showCaregivers, setShowCaregivers] = useState(false)
    const [authenticated, setAuthenticated] = useState(null)
    const {store,actions}=useContext(Context)

    const handleShowCaregivers = () => {
        setShowCaregivers(true);
    }
    useEffect(()=>{
        let authenticate = async ()=>{
            let success = await actions.getPatientProfile()
            if (success) {
                setAuthenticated(true)
            }else{
                setAuthenticated(false)
            }
        }
        authenticate()
    },[])

    return (
        <div>
            {authenticated == null ? (<div>Loading...</div>) : 
            aunthenticated == false ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="alert alert-danger text-center" role="alert">
                        <h4 className="alert-heading">Access Denied</h4>
                        <p>You must be loggend in as a patient to access this page.</p>
                        <hr />
                        <Link to="/patient-login"> <a className="btn btn-danger">Back to Login</a></Link>
                       
                    </div>
                </div>
            ) : authenticated==true?(
                <div>
                <h1>Welcome Patient!</h1>
            <h3>What do you want to do today?</h3>
            <div className="container">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        {/* need to make a page with list of caregivers */}
                        <button className={`nav-link  ${showCaregivers ? "active" : ""}`} onClick={handleShowCaregivers}>Look for a Caregiver</button>
                    </li>
                    <li className="nav-item">
                        {/* this will need to be another page or view that shows their current appointments or even modal */}
                        <a className="nav-link" href="#">Current Appointments</a>
                    </li>
                    <li className="nav-item">
                        {/* create modal that brings up their medical records */}
                        <a className="nav-link" href="#">Medical Records</a>
                    </li>
                    <li className="nav-item">
                        {/* this should take them to their profile where they can update their medical records and personal info */}
                        <Link to="/patient-profile"><a className="nav-link" href="#">See my Profile</a></Link>
                    </li>
                    {/* Potential feature */}
                    {/* <li className="nav-item">
                        <a className="nav-link" href="#">Messages</a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link disabled" aria-disabled="true">Settings</a>
                    </li>
                </ul>
            </div>
            {showCaregivers && <CaregiversList />}
            </div>
        
            ):(
                <div>
                    <h1>There seems to be an error retrieving this page, please comeback later.</h1>
                     <Link to="/"> <a className="btn btn-danger">Back to Home</a></Link>
                </div>
            )
            }

            </div>
    )
}