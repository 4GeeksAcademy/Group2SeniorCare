import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import Carousel from './carousel';
import "../../styles/caregiversList.css"
import { Link } from 'react-router-dom';

export const CaregiversList = () => {
    const { store, actions } = useContext(Context);
    const [caregivers, setCaregivers] = useState([]);
    const [error, setError] = useState(null);
    const [usaState, setUsaState] = useState("");
    const [yearsExp, setYearsExp] = useState(0);
    const [gender, setGender] = useState("");

    const fetchCaregivers = async (filters = {}) => {
        try {
            // Log filters to check what's being sent to the API
            console.log("Filters being sent to API:", filters);
            
            const query = new URLSearchParams(filters).toString();
            const url = `${process.env.BACKEND_URL}/api/caregivers?${query}`;
            let response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('No caregivers match your criteria');
            }
            let data = await response.json();
            setCaregivers(data.caregivers);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        const filters = {};

        // Only add filters if they are not empty or zero
        if (usaState) filters.location = usaState;
        if (yearsExp > 0) filters.experience = yearsExp;
        if (gender) filters.gender = gender;

        // Fetch caregivers when filters change
        fetchCaregivers(filters);
    }, [usaState, yearsExp, gender]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const usaStates = [
        { name: "Alabama", abv: "AL" },
        { name: "Alaska", abv: "AK" },
        { name: "Arizona", abv: "AZ" },
        { name: "Arkansas", abv: "AR" },
        { name: "California", abv: "CA" },
        { name: "Colorado", abv: "CO" },
        { name: "Connecticut", abv: "CT" },
        { name: "Delaware", abv: "DE" },
        { name: "Florida", abv: "FL" },
        { name: "Georgia", abv: "GA" },
        { name: "Hawaii", abv: "HI" },
        { name: "Idaho", abv: "ID" },
        { name: "Illinois", abv: "IL" },
        { name: "Indiana", abv: "IN" },
        { name: "Iowa", abv: "IA" },
        { name: "Kansas", abv: "KS" },
        { name: "Kentucky", abv: "KY" },
        { name: "Louisiana", abv: "LA" },
        { name: "Maine", abv: "ME" },
        { name: "Maryland", abv: "MD" },
        { name: "Massachusetts", abv: "MA" },
        { name: "Michigan", abv: "MI" },
        { name: "Minnesota", abv: "MN" },
        { name: "Mississippi", abv: "MS" },
        { name: "Missouri", abv: "MO" },
        { name: "Montana", abv: "MT" },
        { name: "Nebraska", abv: "NE" },
        { name: "Nevada", abv: "NV" },
        { name: "New Hampshire", abv: "NH" },
        { name: "New Jersey", abv: "NJ" },
        { name: "New Mexico", abv: "NM" },
        { name: "New York", abv: "NY" },
        { name: "North Carolina", abv: "NC" },
        { name: "North Dakota", abv: "ND" },
        { name: "Ohio", abv: "OH" },
        { name: "Oklahoma", abv: "OK" },
        { name: "Oregon", abv: "OR" },
        { name: "Pennsylvania", abv: "PA" },
        { name: "Rhode Island", abv: "RI" },
        { name: "South Carolina", abv: "SC" },
        { name: "South Dakota", abv: "SD" },
        { name: "Tennessee", abv: "TN" },
        { name: "Texas", abv: "TX" },
        { name: "Utah", abv: "UT" },
        { name: "Vermont", abv: "VT" },
        { name: "Virginia", abv: "VA" },
        { name: "Washington", abv: "WA" },
        { name: "West Virginia", abv: "WV" },
        { name: "Wisconsin", abv: "WI" },
        { name: "Wyoming", abv: "WY" }
    ];

    return (
        <div className="caregivers-container">
            <h2>List of Caregivers</h2>
            <nav className="navbar my-5">
                <div className='me-3'>
                    <select className="form-select" aria-label="Default select example" value={usaState} onChange={(e) => setUsaState(e.target.value)}>
                        <option value="">Location</option>
                        {usaStates.map(item => (
                            <option key={item.abv} value={item.abv}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className='me-3'>
                    <select className="form-select" aria-label="Default select example" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className='nav-item'>
                    <label htmlFor="rangeInput">Years of experience: {yearsExp}</label>
                    <input type="range" value={yearsExp} onChange={(e) => setYearsExp(Number(e.target.value))} className="form-range" min="0" max="25" step="1" id="customRange3" />
                </div>
            </nav>
            <div className="caregiver-list">
                {caregivers.length > 0 ? (
                    caregivers.map((caregiver, index) => (
                        <div className="card mb-3" key={index}>
                            <div className="row g-0">
                                <div className="col-md-4 d-flex flex-column justify-content-center  align-items-center my-3">
                                    <img src="..." className="img-fluid rounded-start mb-1" alt="Caregivers" />
                                    <button
                                        className='btn btn-sm btn-primary mt-auto request-button'
                                        onClick={() => actions.requestCaregiver(caregiver.id)}>
                                        Request Caregiver
                                    </button>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <h5 className="card-title">{caregiver.email}</h5>
                                            </li>
                                            <li className="list-group-item">Credentials: {caregiver.credentials}</li>
                                            <li className="list-group-item">Years of experience: {caregiver.experience}</li>
                                            <li className="list-group-item">Location: {caregiver.location}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No caregivers available.</p>
                )}
            </div>
        </div>
    );
};