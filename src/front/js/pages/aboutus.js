import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";





const AboutUs = () => {
    return (
        <div className="container-aboutus">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center">About Us</h1>
                    <p>
                    We are a team of passionate developers who want to make a positive impact in people's life. We believe that technology can be a powerful tool for improving the quality of life of others. We are committed to helping people find the right caregiver for their needs.
                    </p>
                    <p>
                    Our team is composed of experienced developers and caregivers who understand the importance of finding the right caregiver. We are dedicated to providing a great experience for our users.
                    </p>
                    <p>
                    We are a team of passionate developers who want to make a positive impact in people's life. We believe that technology can be a powerful tool for improving the quality of life of others. We are committed to helping people find the right caregiver for their needs.
                    </p>
                 
                </div>
            </div>
        </div>
    );
};

export default AboutUs;




