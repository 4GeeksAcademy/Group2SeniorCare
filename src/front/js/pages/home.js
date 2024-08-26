import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Carousel from "../component/carousel";
import { Testimonial } from "../component/testimonial";
import { Link } from "react-router-dom";




const Home = () => {
    const { store, actions } = useContext(Context);

    const caretakerPoints = [

                                "Personalized care tailored to your needs",
                                "Increased independence and autonomy",
                                "Companionship and social interaction",
                                "Light housekeeping and meal preparation",
                                "Medication reminders and management",
                                "Transportation to appointments and errands",

        
    ]

    const testimonialData = [
        {
          name: "John Rivers",
          description: "A 34-year-old software engineer who loves hiking and photography. Known for his calm demeanor and problem-solving skills."
        },
        {
          name: "Sarah Collins",
          description: "A 28-year-old graphic designer with a passion for modern art. She enjoys painting and often volunteers at local art galleries."
        },
        {
          name: "David Thompson",
          description: "A 42-year-old history professor with a deep knowledge of ancient civilizations. He enjoys traveling and exploring historical landmarks."
        },
        {
          name: "Emily Rodriguez",
          description: "A 30-year-old marketing specialist with a knack for social media strategy. She’s an avid reader and frequently attends book clubs."
        },
        {
          name: "Michael Adams",
          description: "A 25-year-old fitness instructor who’s passionate about health and wellness. He enjoys running marathons and teaching yoga."
        },

      ];
      


    return (
        <>
            <header>
                <div className="container">
                    <div className="header-logo">
                        {/* Logo SVG goes here */}
                        <h2 style={{color: "white"}}>Caregiver Connect</h2>
                    </div>

                    <div  className="d-flex signupbutton justify-content-space-between">
                    <Link to="/signup-caregiver">
                        <div className="header-buttons d-flex justify-content-center" >
                        <button className="cta-button-1  ">Become A Caregiver</button>
                        
                        </div>
                    </Link>
                    <Link to="/signup-patient">
                        <div className="header-buttons  d-flex justify-content-center">
                        
                        <button className="cta-button-1 ">Join As a Patient</button>
                        </div>  
                    </Link>
                    </div>

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
            <div className=" row">
                <div className="col-5 d-flex justify-content-center align-items-center">
                    <div className="text-dark">
                            <h2 className="quote-mid">“We are dedicated to providing exceptional in-home care precisely when you need it, ensuring your comfort and enhancing your quality of life.” </h2>
                    </div>
                </div>
                    
                

                <div className="col-7">
                        {/* <Carousel /> */}
                        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                            <img src="https://images.unsplash.com/photo-1606940743881-b33f4b04d661?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" alt="..."></img>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                            </div>
                            <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1606940743881-b33f4b04d661?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" alt="..."></img>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                            </div>
                            <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1606940743881-b33f4b04d661?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" alt="..."></img>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                        </div>

                </div>
            
               
            </div>


                    
                    <div>
                    
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
                    <div className="card-1" style={{ borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", width: "300px", height: "200px", margin: "10px", backgroundColor: "#fff" }}>
                        <h4 className="card-title"><i className="fa-solid fa-helmet-safety p-2"></i>Safety First</h4>
                        <p className="card-text">We require all caregivers to be fully vaccinated for COVID-19</p>
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
                    <div class="card text-bg-dark" style={{width: "300px", height: "200px", backgroundImage: "url(https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", backgroundSize: "cover"}}>
            
                    </div>
                </div>
            </div>

            <style>
                
            </style>
                <div className="section-1">
              
                    <div className="card-1" style={{borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", width: "300px", height: "200px", margin: "10px", backgroundColor: "#fff"}}>
                     
                        <h4 className="card-title"><i class="fa-solid fa-user-group"></i>Fast Matching</h4>
                        <p className="card-text">We'll match you with a caregiver within 24 hours</p>
                    </div>
                    <div className="card-1" style={{borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", width: "300px", height: "200px", margin: "10px", backgroundColor: "#fff"}}>
                    
                        <h4 className="card-title"><i class="fa-solid fa-heart"></i>Experienced Caregivers</h4>
                        <p className="card-text">All caregivers have at least 2 years of experience and have completed a background check</p>
                    </div>
                    <div className="card-1" style={{borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", width: "300px", height: "200px", margin: "10px", backgroundColor: "#fff"}}>
                        
                        <h4 className="card-title"><i class="fa-solid fa-helmet-safety"></i>Safety First</h4>
                        <p className="card-text">We require all caregivers to be fully vaccinated for COVID-19</p>
                    </div>
                
                    </div>
                    </div>
                    
                    <div>
                    

                    <div className="section" style={{backgroundColor: "#fff"}}>
                    <h2>Why Choose Us</h2>
                    <p>Finding the right caregiver can take time, but we're here to help. Our team will work with you to find a caregiver who meets your needs, whether it's helping with daily tasks, providing companionship, or caring for a loved one. Here's why people love our service:</p>
                    <div class="card" style={{borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", width: "300px", height: "200px", margin: "10px", backgroundImage: "url(https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", backgroundSize: "cover"}}>
                    
                    </div>
                </div>

                    </div>

                    
                   
            <footer>
               
            </footer>
        </>
    );
};

export default Home;





