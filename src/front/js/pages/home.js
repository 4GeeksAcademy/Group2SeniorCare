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
                <input type="text" placeholder="Enter city or zip code" />
                <button className="cta-button">Find a caregiver now!</button>
            </div>

            
                <div className="section">
                    <h2>Why Choose Us</h2>
                    <p>Finding the right caregiver can take time, but we're here to help. Our team will work with you to find a caregiver who meets your needs, whether it's helping with daily tasks, providing companionship, or caring for a loved one. Here's why people love our service:</p>
                    <div class="card text-bg-dark" style={{width: "300px", height: "200px", backgroundImage: "url(https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", backgroundSize: "cover"}}>
                <div class="card-img-overlay">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small>Last updated 3 mins ago</small></p>
                </div>
                </div>
                </div>

               
               
                   


                <div>
                <div className="section-1">
                    <div className="card-1">
                     
                        <h2 className="text-custom"><i class="fa-solid fa-user-group"></i>Fast Matching</h2>
                        <p>We'll match you with a caregiver within 24 hours</p>
                    </div>
                    <div className="card-1">
                    
                        <h2 className="text-custom"><i class="fa-solid fa-heart"></i>Experienced Caregivers</h2>
                        <p>All caregivers have at least 2 years of experience and have completed a background check</p>
                    </div>
                    <div className="card-1">
                        
                        <h2 className="text-custom"><i class="fa-solid fa-helmet-safety"></i>Safety First</h2>
                        <p>We require all caregivers to be fully vaccinated for COVID-19</p>
                    </div>
                    <div className="card-1">
                       
                        <h2 className="text-custom"><i class="fa-solid fa-check"></i>Convenient</h2>
                        <p>Find a caregiver who can work on your schedule, whether it's weekdays, weekends, or evenings</p>
                    </div>
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





