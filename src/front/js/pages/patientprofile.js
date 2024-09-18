import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/patientprofile.css";
import { ProfileSettings } from "./profilesettings";
import { Link } from "react-router-dom";

const PatientProfile = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        name: store.user.name,
        dob: store.user.dob,
        email: store.user.email,
        password: store.user.password
    });

    useEffect(() => {
        setFormData({
            name: store.user.name,
            dob: store.user.dob,
            email: store.user.email,
            password: store.user.password
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
                  <h4>{formData.name}</h4>
                  <p>Gender: {formData.gender}, Age: {formData.age}</p>
                </div>
              </div>
              <div className="stats">
                <div className="stat">
                  <p className="stat-number">3</p>
                  <p className="stat-text">Caregivers Found</p>
                </div>
                <div className="stat">
                  <p className="stat-number">5</p>
                  <p className="stat-text">Caregivers Contacted</p>
                </div>
                <div className="stat">
                  <p className="stat-number">2</p>
                  <p className="stat-text">Jobs Posted</p>
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

export default PatientProfile;

