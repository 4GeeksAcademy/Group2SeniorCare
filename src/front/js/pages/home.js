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
                        <h2 style={{color: "white"}}>Caregiver Connect</h2>
                    </div>
                   
                    <button className="cta-button-1">Become A Caregiver</button>
                    
                    
                </div>
            </header>
            <div className="container-backround">
            <div className="hero container">
                
                      
                        <div className="hero-text">
                            <h1 className= "text-custom-1">Find a caregiver in 24 hours or less</h1>
                            <input type="text" placeholder="Enter city or zip code" />
                            <button className="cta-button">Find a caregiver now!</button>
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                <p>“One person caring about another represents life’s most significant value.” – Jim Rohn</p>
                                </blockquote>
                            </div>
                        </div>

            
            </div>
            </div>

            <div className="undercover">
            <div class="card-body-1">
                                <blockquote class="blockquote mb-0" style={{color: "black"}}>
                                <h2>“We are dedicated to <br/> providing exceptional in-home<br/> care precisely when you need it,<br/> ensuring your comfort and enhancing your quality of life.” </h2>
                                </blockquote>
                            </div>
                <Carousel />
            </div>

            <div className="container-2" >
                <div className="section">
                    <h2>Why Choose Us</h2>
                    <p>Finding the right caregiver can take time, but we're here to help. Our team will work with you to find a caregiver who meets your needs, whether it's helping with daily tasks, providing companionship, or caring for a loved one. Here's why people love our service:</p>
                    <div class="card text-bg-dark" style={{width: "300px", height: "200px", backgroundImage: "url(https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", backgroundSize: "cover"}}>
            
                    </div>
                </div>

               
               
                   


                
                <div className="section-1">
                    <div className="card-1">
                     
                        <h2 className=""><i class="fa-solid fa-user-group"></i>Fast Matching</h2>
                        <p>We'll match you with a caregiver within 24 hours</p>
                    </div>
                    <div className="card-1">
                    
                        <h2 className=""><i class="fa-solid fa-heart"></i>Experienced Caregivers</h2>
                        <p>All caregivers have at least 2 years of experience and have completed a background check</p>
                    </div>
                    <div className="card-1">
                        
                        <h2 className=""><i class="fa-solid fa-helmet-safety"></i>Safety First</h2>
                        <p>We require all caregivers to be fully vaccinated for COVID-19</p>
                    </div>
                    <div className="card-1">
                       
                        <h2 className=""><i class="fa-solid fa-check"></i>Convenient</h2>
                        <p>Find a caregiver who can work on your schedule, whether it's weekdays, weekends, or evenings</p>
                    </div>
                    </div>
                    </div>

                    
                   
            <footer>
               
            </footer>
        </>
    );
};

export default Home;





