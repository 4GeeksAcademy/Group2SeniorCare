import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/patientprofile.css";
import { ProfileSettings } from "./profilesettings";
import { Link } from "react-router-dom";

const CaregiverProfile = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        fullname: store.user.fullname,
        email: store.user.email,
        phone: store.user.phone,
        experience: store.user.experience,
        qualifications: store.user.qualifications,
        availability: store.user.availability,
        location: store.user.location
    });

    useEffect(() => {
        setFormData({
            fullname: store.user.fullname,
            email: store.user.email,
            phone: store.user.phone,
            experience: store.user.experience,
            qualifications: store.user.qualifications,
            availability: store.user.availability,
            location: store.user.location
        });
    }, [store.user]);

    return (
        <div className="container-fluid-menu">
          <div className="row">
            <div className="col-3">
              <div className="menu">
                <ul className="list-group">
                  <li className="list-group-item">Home</li>
                  <li className="list-group-item">Activities</li>
                  <Link to= "/profilesettings"> <li className="list-group-item">Profile Settings</li> </Link>
                </ul>
              </div>
            </div>
            <div className="col-9">
              <div className="profile" style={{backgroundColor: "transparent"}}>
                <div className="profile-image">
                  <img src="https://randomuser.me/api/portraits/men/6.jpg" className="rounded-circle" alt="profile" />
                </div>
                <div className="profile-info" style={{paddingLeft: "1.5rem"}}>
                  <h4>fullname: {formData.fullname}</h4>
                  <p>email: {formData.email}</p>
                  <p>phone: {formData.phone}</p>
                  <p>experience: {formData.experience}</p>
                  <p>qualifications: {formData.qualifications}</p>
                  <p>availability: {formData.availability}</p>
                  <p>location: {formData.location}</p>
                </div>
              </div>
              <h4 className="text-center">Personal Interests</h4>
              <div className="interestsContainer">
                <div className="interest">
                <i class="fa-solid fa-seedling"></i>
                
                  <p className="interest-text"> Gardening</p>
                </div>
                <div className="interest">
                <i class="fa-solid fa-palette"></i>
                  <p className="interest-text">Painting</p>
                </div>
                <div className="interest">
                <i class="fa-solid fa-mitten"></i>
                  <p className="interest-text">Knitting</p>
                </div>
                <div className="interest">
                <i class="fa-solid fa-utensils"></i>
                  <p className="interest-text">Cooking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default CaregiverProfile;

