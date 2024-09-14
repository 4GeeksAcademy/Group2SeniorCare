import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Carousel from "../component/carousel";
import { Link } from "react-router-dom";

const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <header>
                <div className="container">
                    <div className="header-logo">
                        {/* Logo SVG goes here */}
                        <h2 style={{ color: "white" }}>Caregiver Connect</h2>
                    </div>
                    <Link to="/signup-caregiver">
                        <button className="cta-button-1">Become A Caregiver</button>
                    </Link>
                </div>
            </header>

            <div className="container-background" style={{ position: "relative" }}>
                <div className="hero container">
                    <div className="hero-text">
                        <h1 className="text-custom-1">Find a caregiver in 24 hours or less</h1>
                        <input type="text" placeholder="Enter city or zip code" />
                        <button className="cta-button">Find a caregiver now!</button>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>“One person caring about another represents life’s most significant value.” – Jim Rohn</p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>

            <div className="undercover">
                <div className="card-body-1">
                    <blockquote className="blockquote mb-0" style={{ color: "black" }}>
                        <h2>“We are dedicated to <br /> providing exceptional in-home<br /> care precisely when you need it,<br /> ensuring your comfort and enhancing your quality of life.”</h2>
                    </blockquote>
                </div>
                <Carousel />
            </div>

            <div className="container-2" style={{ backgroundColor: "#f5f5f5" }}>
                <div className="container-3" style={{ width: "100%", height: "300px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" }}>
                    <div className="animation-container">
                        <div className="animation">
                            <div className="animation-image">
                                <img src="https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Caretaker helping elderly person" />
                            </div>
                            <div className="animation-text">
                                <h2 className="animation-title">Why Choose a Caretaker?</h2>
                                <ul className="animation-list">
                                    <li>Personalized care tailored to your needs</li>
                                    <li>Increased independence and autonomy</li>
                                    <li>Companionship and social interaction</li>
                                    <li>Light housekeeping and meal preparation</li>
                                    <li>Medication reminders and management</li>
                                    <li>Transportation to appointments and errands</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-1">

                    <div className="card-1" style={{ borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", width: "300px", height: "200px", margin: "10px", backgroundColor: "#fff" }}>
                        <h4 className="card-title"><i className="fa-solid fa-user-group p-2"></i>Fast Matching</h4>
                        <p className="card-text">We'll match you with a caregiver within 24 hours</p>
                    </div>

                    <div className="card-1" style={{ borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", width: "300px", height: "200px", margin: "10px", backgroundColor: "#fff" }}>
                        <h4 className="card-title"><i className="fa-solid fa-heart p-2"></i>Experienced Caregivers</h4>
                        <p className="card-text">All caregivers have at least 2 years of experience and have completed a background check</p>
                    </div>

                    <div className="card-1" style={{ borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", width: "300px", height: "200px", margin: "10px", backgroundColor: "#fff" }}>
                        <h4 className="card-title"><i className="fa-solid fa-helmet-safety p-2"></i>Safety First</h4>
                        <p className="card-text">We require all caregivers to be fully vaccinated for COVID-19</p>
                    </div>
                </div>
            </div>

            <div>
                <div className="section" style={{ backgroundColor: "#fff" }}>
                    <h2>Why Choose Us</h2>
                    <p>Finding the right caregiver can take time, but we're here to help. Our team will work with you to find a caregiver who meets your needs, whether it's helping with daily tasks, providing companionship, or caring for a loved one. Here's why people love our service:</p>
                    <div className="card" style={{ borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", width: "300px", height: "200px", margin: "10px", backgroundImage: "url(https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", backgroundSize: "cover" }}>
                    </div>
                </div>
            </div>

            <footer></footer>
        </>
    );
};

export default Home;
