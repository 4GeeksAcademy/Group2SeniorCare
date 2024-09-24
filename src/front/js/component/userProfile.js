import React, { useContext, useState,useEffect } from "react";
import { Context } from "../store/appContext";

export const UserProfile = ({refresh}) => {
    const { store, actions } = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: store.patient?.name || "",
        date_of_birth: store.patient?.date_of_birth || "",
        email: store.patient?.email || "",
        phone: store.patient?.phone || "",
        emergency_contact: store.patient?.emergency_contact || "",
        allergies: store.patient?.allergies || "",
        blood_type: store.patient?.blood_type || "",
        hobbies: store.patient?.hobbies || "",
        
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {

        // Trigger an action to save the updated patient data
        actions.updatePatientProfile(formData);
        setEditMode(false); // Exit edit mode
    };

    const handleDiscard = () => {
        setEditMode(false)
        setFormData({
            name: store.patient?.name || "",
            date_of_birth: store.patient?.date_of_birth || "",
            email: store.patient?.email || "",
            phone: store.patient?.phone || "",
            emergency_contact: store.patient?.emergency_contact || "",
            allergies: store.patient?.allergies || "",
            blood_type: store.patient?.blood_type || "",
            hobbies: store.patient?.hobbies || "",
            is_active: store.patient?.is_active || false,
            is_current: store.patient?.is_current || false
        })

    }

    useEffect(()=>{
        setFormData({
            name: store.patient?.name || "",
            date_of_birth: store.patient?.date_of_birth || "",
            email: store.patient?.email || "",
            phone: store.patient?.phone || "",
            emergency_contact: store.patient?.emergency_contact || "",
            allergies: store.patient?.allergies || "",
            blood_type: store.patient?.blood_type || "",
            hobbies: store.patient?.hobbies || "",
            is_active: store.patient?.is_active || false,
            is_current: store.patient?.is_current || false
        })

    },[refresh])
    return (
        <div>

            {editMode ? (
                <div>


                    <h2>
                        Name:{" "}
                        <input
                            type="text"
                            name="name"
                            placeholder={store.patient?.name}
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </h2>
                    <p>
                        Date of Birth:{" "}
                        <input
                            type="date"
                            name="date_of_birth"
                            placeholder={store.patient?.date_of_birth}
                            value={formData.date_of_birth}
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>
                        Email:{" "}
                        <input
                            type="email"
                            name="email"
                            placeholder={store.patient?.email}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </p>
                  
                        <p>
                            Phone:{" "}
                            <input
                                type="text"
                                name="phone"
                                placeholder={store.patient?.phone}
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </p>
                
                 
                        <p>
                            Emergency Contact:{" "}
                            <input
                                type="text"
                                name="emergency_contact"
                                placeholder={store.patient?.emergency_contact}
                                value={formData.emergency_contact}
                                onChange={handleInputChange}
                            />
                        </p>
                  
                 
                        <p>
                            Allergies:{" "}
                            <input
                                type="text"
                                name="allergies"
                                placeholder={store.patient?.allergies}
                                value={formData.allergies}
                                onChange={handleInputChange}
                            />
                        </p>
                 
                   
                        <p>
                            Blood Type:{" "}
                            <input
                                type="text"
                                name="blood_type"
                                placeholder={store.patient?.blood_type}
                                value={formData.blood_type}
                                onChange={handleInputChange}
                            />
                        </p>
                
                   
                        <p>
                            Hobbies:{" "}
                            <input
                                type="text"
                                name="hobbies"
                                placeholder={store.patient?.hobbies}
                                value={formData.hobbies}
                                onChange={handleInputChange}
                            />
                        </p>
                   
                  

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-secondary" onClick={() => handleDiscard()}>
                            Discard Changes
                        </button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            Save
                        </button>
                    </div>


                </div>
            ) : (
                <div>
                    <div className="d-flex justify-content-end">
                        <button className="btn" onClick={() => setEditMode(!editMode)}>
                            <i className="fa-solid fa-user-pen"></i>
                        </button>

                    </div>

                    <h2>{store.patient?.name}</h2>
                    <p>Date of Birth: {store.patient?.date_of_birth}</p>
                    <p>Email: {store.patient?.email}</p>
                    {store.patient?.phone && <p>Phone: {store.patient.phone}</p>}
                    {store.patient?.emergency_contact && (
                        <p>Emergency Contact: {store.patient.emergency_contact}</p>
                    )}
                    {store.patient?.allergies && <p>Allergies: {store.patient.allergies}</p>}
                    {store.patient?.blood_type && <p>Blood Type: {store.patient.blood_type}</p>}
                    {store.patient?.hobbies && <p>Hobbies: {store.patient.hobbies}</p>}
                    {store.patient?.is_active !== undefined && (
                        <p>Active: {store.patient.is_active ? "Yes" : "No"}</p>
                    )}
                    {store.patient?.is_current !== undefined && (
                        <p>Currently Employed: {store.patient.is_current ? "Yes" : "No"}</p>
                    )}
                </div>
            )}
        </div>
    );
};
