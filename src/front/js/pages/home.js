import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Carousel from "../component/carousel";



const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <header>
				
                <div className="container">
                    <div className="header-logo">
                        {/* Logo SVG goes here */}
                        <h2>Caregiver Connect</h2>
                    </div>
                   
                    <button className="cta-button-1">Sign-in</button>
                    <button className="cta-button-1">Sign-up</button>
                    
                </div>
            </header>

            <div className="hero container">
                <h1 className= "text-custom-1">Find a caregiver in 24 hours or less</h1>
                {/* <input type="text" placeholder="Enter your email" /> */}
                <button className="cta-button">Find a caregiver now!</button>
            </div>

            
                <div className="section">
                    <h2>Why Choose Us</h2>
                    <p>Finding the right caregiver can take time, but we're here to help. Our team will work with you to find a caregiver who meets your needs, whether it's helping with daily tasks, providing companionship, or caring for a loved one. Here's why people love our service:</p>
                </div>

             
                <div className="section-1">
                    <div className="card">
                     
                        <h2 className="text-custom"><i class="fa-solid fa-user-group"></i>Fast Matching</h2>
                        <p>We'll match you with a caregiver within 24 hours</p>
                    </div>
                    <div className="card">
                    
                        <h2 className="text-custom"><i class="fa-solid fa-heart"></i>Experienced Caregivers</h2>
                        <p>All caregivers have at least 2 years of experience and have completed a background check</p>
                    </div>
                    <div className="card">
                        
                        <h2 className="text-custom"><i class="fa-solid fa-helmet-safety"></i>Safety First</h2>
                        <p>We require all caregivers to be fully vaccinated for COVID-19</p>
                    </div>
                    <div className="card">
                       
                        <h2 className="text-custom"><i class="fa-solid fa-check"></i>Convenient</h2>
                        <p>Find a caregiver who can work on your schedule, whether it's weekdays, weekends, or evenings</p>
                    </div>
                   
                    
                    
                
            </div>
            <div>
                    <Carousel />
                    </div>
            <footer>
               
            </footer>
        </>
    );
};

export default Home;





