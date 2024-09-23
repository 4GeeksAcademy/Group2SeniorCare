import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const CaregiverProfile = ({ refresh }) => {
    const { store, actions } = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: store.caregiver?.name || "",
        email: store.caregiver?.email || "",
        phone: store.caregiver?.phone || "",
        location: store.caregiver?.location || "",
        experience: store.caregiver?.experience || "",
        qualifications: store.caregiver?.qualifications || "",
        availability: store.caregiver?.availability || "",
        gender: store.caregiver?.gender || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        // Trigger an action to save the updated caregiver data
        actions.updateCaregiverProfile(formData);
        setEditMode(false); // Exit edit mode
    };

    const handleDiscard = () => {
        setEditMode(false);
        setFormData({
            name: store.caregiver?.name || "",
            email: store.caregiver?.email || "",
            phone: store.caregiver?.phone || "",
            location: store.caregiver?.location || "",
            experience: store.caregiver?.experience || "",
            qualifications: store.caregiver?.qualifications || "",
            availability: store.caregiver?.availability || "",
            gender: store.caregiver?.gender || "",
        });
    };

    useEffect(() => {
        setFormData({
            name: store.caregiver?.name || "",
            email: store.caregiver?.email || "",
            phone: store.caregiver?.phone || "",
            location: store.caregiver?.location || "",
            experience: store.caregiver?.experience || "",
            qualifications: store.caregiver?.qualifications || "",
            availability: store.caregiver?.availability || "",
            gender: store.caregiver?.gender || "",
        });
    }, [refresh]);

    return (
        <div>
            {editMode ? (
                <div>
                    <h2>
                        Name:{" "}
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </h2>
                    <p>
                        Email:{" "}
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>
                        Phone:{" "}
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>
                        Location:{" "}
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>
                        Experience:{" "}
                        <input
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>
                        Qualifications:{" "}
                        <input
                            type="text"
                            name="qualifications"
                            value={formData.qualifications}
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>
                        Availability:{" "}
                        <input
                            type="text"
                            name="availability"
                            value={formData.availability}
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>
                        Gender:{" "}
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                        />
                    </p>

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-secondary" onClick={handleDiscard}>
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

                    <h2>{store.caregiver?.name}</h2>
                    <p>Email: {store.caregiver?.email}</p>
                    <p>Phone: {store.caregiver?.phone}</p>
                    <p>Location: {store.caregiver?.location}</p>
                    <p>Experience: {store.caregiver?.experience}</p>
                    <p>Qualifications: {store.caregiver?.qualifications}</p>
                    <p>Availability: {store.caregiver?.availability}</p>
                    <p>Gender: {store.caregiver?.gender}</p>
                </div>
            )}
        </div>
    );
};
