import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import "../../styles/caregiversList.css";
import { AppointmentRequestModal } from './AppointmentRequestModal';

export const CaregiversList = () => {
    const { store, actions } = useContext(Context);
    const [caregivers, setCaregivers] = useState([]);
    const [error, setError] = useState(null);
    const [usaState, setUsaState] = useState("");
    const [yearsExp, setYearsExp] = useState(2);
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCaregivers = async (filters = {}) => {
        setLoading(true);
        try {
            const query = new URLSearchParams(filters).toString();
            const url = `${process.env.BACKEND_URL}/api/caregivers${"?" + query}`;
            let response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + sessionStorage.getItem("token")
                }
            });
            if (!response.ok) {
                throw new Error('No caregivers match your criteria');
            }
            console.log("The response is ok, coming now json " + response)
            let data = await response.json();
            console.log("your data is" + data)
            console.log("your data.caregivers info is" + data.caregivers)
            setCaregivers(data.caregivers);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            const filters = {};
            if (usaState) filters.location = usaState;
            if (yearsExp > 0) filters.experience = yearsExp;
            if (gender) filters.gender = gender;
    
            try {
                await fetchCaregivers(filters, { signal: controller.signal });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            }
        };
    
        fetchData();
    
        return () => controller.abort();
    }, [usaState, yearsExp, gender]);

    const experienceOptions = [
        { value: "", label: "All" },
        { value: "1", label: "1 year" },
        { value: "2", label: "2 years" },
        { value: "3", label: "3 years" },
        { value: "4", label: "4 years" },
        { value: "5", label: "5 years" },
        { value: "6", label: "6 years" },
        { value: "7", label: "7 years" },
        { value: "8", label: "8 years" },
        { value: "9", label: "9 years" },
        { value: "10", label: "10 or more years" }
    ];

    const usaStates = [
        { name: "Alabama", abv: "AL" }, { name: "Alaska", abv: "AK" }, { name: "Arizona", abv: "AZ" },
        { name: "Arkansas", abv: "AR" }, { name: "California", abv: "CA" }, { name: "Colorado", abv: "CO" },
        { name: "Connecticut", abv: "CT" }, { name: "Delaware", abv: "DE" }, { name: "Florida", abv: "FL" },
        { name: "Georgia", abv: "GA" }, { name: "Hawaii", abv: "HI" }, { name: "Idaho", abv: "ID" },
        { name: "Illinois", abv: "IL" }, { name: "Indiana", abv: "IN" }, { name: "Iowa", abv: "IA" },
        { name: "Kansas", abv: "KS" }, { name: "Kentucky", abv: "KY" }, { name: "Louisiana", abv: "LA" },
        { name: "Maine", abv: "ME" }, { name: "Maryland", abv: "MD" }, { name: "Massachusetts", abv: "MA" },
        { name: "Michigan", abv: "MI" }, { name: "Minnesota", abv: "MN" }, { name: "Mississippi", abv: "MS" },
        { name: "Missouri", abv: "MO" }, { name: "Montana", abv: "MT" }, { name: "Nebraska", abv: "NE" },
        { name: "Nevada", abv: "NV" }, { name: "New Hampshire", abv: "NH" }, { name: "New Jersey", abv: "NJ" },
        { name: "New Mexico", abv: "NM" }, { name: "New York", abv: "NY" }, { name: "North Carolina", abv: "NC" },
        { name: "North Dakota", abv: "ND" }, { name: "Ohio", abv: "OH" }, { name: "Oklahoma", abv: "OK" },
        { name: "Oregon", abv: "OR" }, { name: "Pennsylvania", abv: "PA" }, { name: "Rhode Island", abv: "RI" },
        { name: "South Carolina", abv: "SC" }, { name: "South Dakota", abv: "SD" }, { name: "Tennessee", abv: "TN" },
        { name: "Texas", abv: "TX" }, { name: "Utah", abv: "UT" }, { name: "Vermont", abv: "VT" },
        { name: "Virginia", abv: "VA" }, { name: "Washington", abv: "WA" }, { name: "West Virginia", abv: "WV" },
        { name: "Wisconsin", abv: "WI" }, { name: "Wyoming", abv: "WY" }
    ];

    return (
        <div className="caregivers-container">
            <h2>List of Caregivers</h2>
            <nav className="navbar my-5">
                <div className='me-3'>
                    <select
                        className="form-select"
                        value={usaState}
                        onChange={(e) => setUsaState(e.target.value)}
                    >
                        <option value="">Location</option>
                        {usaStates.map(item => (
                            <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className='me-3'>
                    <select
                        className="form-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className='me-3'>
                    <label htmlFor="rangeInput">Years of experience: {yearsExp}</label>
                    <input
                        type="range"
                        value={yearsExp}
                        onChange={(e) => setYearsExp(parseInt(e.target.value))}
                        className="form-range"
                        min="2"
                        max="10"
                        step="1"
                        id="customRange3"
                    />
                </div>
            </nav>

            {loading ? (
                <p>Loading caregivers...</p>
            ) : error ? (
                <div className="error-message">Error: {error}</div>
            ) : (
                <div className="caregiver-list">
                    {caregivers.length > 0 ? (
                        caregivers.map((caregiver, index) => (
                            <div className="card mb-3" key={index}>
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex flex-column justify-content-center align-items-center my-3">
                                        <img
                                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                            className="img-fluid rounded-start mb-1"
                                            alt="Caregiver"
                                            width="150px"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-sm mt-auto request-button"
                                            data-bs-toggle="modal"
                                            data-bs-target={"#staticBackdrop" + caregiver.id}
                                        >
                                            Request Caregiver
                                        </button>
                                        {/* <p>{store.successMessage == "" ? "": store.successMessage}</p> */}
                                        <AppointmentRequestModal caregiver={caregiver} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <h5 className="card-title">{caregiver.email}</h5>
                                                </li>
                                                <li className="list-group-item">Qualifications: {caregiver.qualifications}</li>
                                                <li className="list-group-item">Years of experience: {caregiver.experience}</li>
                                                <li className="list-group-item">Location: {caregiver.location}</li>
                                                <li className="list-group-item">Gender: {caregiver.gender}</li>
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
            )}
        </div>
    );
};