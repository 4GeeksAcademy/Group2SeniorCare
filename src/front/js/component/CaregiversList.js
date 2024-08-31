import React, { useEffect, useState , useContext} from 'react';
import { Context } from '../store/appContext';
import "../../styles/caregiversList.css"

export const CaregiversList = () => {
    const { store, actions} =  useContext(Context);
    const [caregivers, setCaregivers] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCaregivers = async () => {
            try {
                let response = await fetch(process.env.BACKEND_URL + '/api/caregivers', {
                    headers: {
                        // 'Authorization': 'Bearer' + sessionStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch caregivers');
                }
                let data = await response.json();
                setCaregivers(data.caregivers)
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCaregivers();
    }, [])
    
    if (error) {
        return <div>Error: {error}</div>
    }

    const handleRequestCaregiver = (caregiverId) => {
        actions.requestCaregiver(caregiverId);
    }

    return (
        <div className="caregivers-container">
            <h2>List of Caregivers</h2>
            <div className="caregiver-list">
                {caregivers.length > 0 ? (
                    caregivers.map((caregiver, index) => (
                        // <div className="caregiver-card" key={index}>
                        //     <h3>{caregiver.name}</h3>
                        //         <p>Email: {caregiver.email}</p>
                        //         <p>Credentials: {caregiver.credentials}</p>
                        //         <p>Location: {caregiver.location}</p>
                        //         <p>Experience: {caregiver.experience}</p>
                        // </div>
                        <div className="card mb-3" key={index}>
                            <div className="row g-0">
                                <div className="col-md-4 d-flex flex-column justify-content-center  align-items-center my-3">
                                    <img src="..." className="img-fluid rounded-start mb-1" alt="Caregivers" />
                                    <button 
                                        className='btn btn-sm btn-primary mt-auto request-button'
                                        onclick = {()=>handleRequestCaregiver(caregiver.id)}>
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
                                            {/* <li className="list-group-item">Status: {caregiver.is_active ? 'Active' : 'Inactive'}</li> */}
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