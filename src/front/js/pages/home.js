import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
// import Carousel from "../component/carousel";
// import { Testimonial } from "../component/testimonial";
import { Link } from "react-router-dom";
import { Testimonial } from "../component/testimonal";
import RecipesApi from "../component/recipesApi";

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
            name: "Sarah Collins",
            description: "I was hesitant at first, but CareConnect delivered! The caregiver they provided was attentive, patient, and genuinely caring. They exceeded my expectations and made me feel comfortable and supported. Five stars!",
            image: "https://randomuser.me/api/portraits/women/2.jpg"
        },
        {
            name: "John Rivers",
            description: "I was blown away by the quality of care and compassion provided by the caregiver from CareConnect. They truly went above and beyond to make sure my loved one was comfortable and happy. Highly recommend!",
            image: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            name: "David Thompson",
            description: "The caregiver from CareConnect was a godsend! They helped my mother with her daily routines and even took her to appointments. We couldn't have asked for a more caring and professional service. Thank you!",
            image: "https://randomuser.me/api/portraits/men/5.jpg"
        },
        {
            name: "Emily Rodriguez",
            description: "I was skeptical about hiring a caregiver, but the team at CareConnect made the process seamless and stress-free. The caregiver they provided was kind, patient, and knowledgeable. I couldn't be happier with the service!",
            image: "https://randomuser.me/api/portraits/women/4.jpg"
        },
        {
            name: "Michael Adams",
            description: "The caregiver from CareConnect was more than just a caregiver - they were a friend to my father. They went above and beyond to make sure he was comfortable and happy. We're so grateful to have found them!",
            image: "https://randomuser.me/api/portraits/men/3.jpg"
        },

    ];



    return (
        <>
            <header>
                <div className="container">
                    <div className="header-logo">
                        {/* Logo SVG goes here */}
                        {/* <h2 style={{ color: "white" }}>Caregiver Connect</h2> */}
                    </div>
                    <div className="d-flex signupbutton justify-content-center">
                        <Link to="/signup-caregiver ">
                            <div className="header-buttons d-flex justify-content-center">
                                <button className="cta-button-1 text-decoration-none ">Become A Caregiver</button>

                            </div>
                        </Link>
                        <Link to="/signup-patient">
                            <div className="header-buttons  d-flex justify-content-center">

                                <button className="cta-button-1 ">Join As A Patient</button>
                            </div>
                        </Link>
                    </div>

                </div>
            </header>
            <div className="container-background" style={{ position: "relative" }}>
                <div className="hero container">
                    <div className="row">
                        <div className="col-6">
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <p>“One person caring about another represents life’s most significant value.” – Jim Rohn</p>
                                </blockquote>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="hero-text">
                                <h1 className="text-custom-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: '10px' }}>Find a caregiver in 24 hours or less</h1>
                                <input type="text" placeholder="Enter city or zip code" />
                                <button className="cta-button">Find a caregiver now!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row me-0">
                    <div className="col-5 d-flex justify-content-center align-items-center">
                        <div className="container-flex ">
                            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <h2 className="quote-mid" style={{ color: "#0a3b6a" }}>“We are dedicated to providing exceptional in-home care precisely when you need it, ensuring your comfort and enhancing your quality of life.”</h2>
                                    </div>
                                    <div className="carousel-item">
                                        <h2 className="quote-mid" style={{ color: "#0a3b6a" }}>"When you need it most, we provide attentive in-home care that supports your comfort and day-to-day ease."</h2>
                                    </div>
                                    <div className="carousel-item">
                                        <h2 className="quote-mid" style={{ color: "#0a3b6a" }}>"We offer compassionate in-home care precisely when needed, with your comfort and daily comfort as our focus."</h2>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>    
                    <div className="col-7 ">
                        {/* <Carousel Images RIght Side/> */}
                        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active ">
                                    <img src="https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyZWdpdmVyfGVufDB8fDB8fHww" className="d-block w-100" alt="..."></img>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5 style={{ textShadow: "2px 2px 2px black" }}>Professional Caregivers</h5>
                                        {/* <p>Some representative placeholder content for the first slide.</p> */}
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src="https://plus.unsplash.com/premium_photo-1661581883801-56a4b46f9495?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9tZSUyMHZpc2l0fGVufDB8fDB8fHww" className="d-block w-100" alt="..."></img>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5 style={{ textShadow: "2px 2px 2px black" }}>Percriptions & Medication Assitance</h5>
                                        {/* <p>Some representative placeholder content for the second slide.</p> */}
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src="https://media.istockphoto.com/id/1296176596/photo/nurse-assisting-senior-with-walking-cane.webp?a=1&b=1&s=612x612&w=0&k=20&c=luIP6wRVIPSkj2O58CoiZPiLO4p9qImjoGEwaoktC3w=" className="d-block w-100" alt="..."></img>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5 style={{ textShadow: "2px 2px 2px black" }}>Walking & Movement Assitance</h5>
                                        {/* <p>Some representative placeholder content for the third slide.</p> */}
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
            </div>    
            <div className="section-1 justify-content-center">
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
                    <p className="card-text">We ensure caregivers are trained in proper health protocols and safety measures.</p>
                </div>
                <div className="card-1" style={{ borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", width: "300px", height: "200px", margin: "10px", backgroundColor: "#fff" }}>
                    <h4 className="card-title"><i className="fa-solid fa-user-group"></i>Personalized Care</h4>
                    <p className="card-text">We tailor our services to meet your unique needs, ensuring you get the best care possible.</p>
                </div>
                <div className="card-1" style={{ borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", width: "300px", height: "200px", margin: "10px", backgroundColor: "#fff" }}>
                    <h4 className="card-title"><i className="fa-solid fa-user-tie"></i>Certified Professionals</h4>
                    <p className="card-text">All our caregivers are certified in CPR and First Aid, providing you with peace of mind and quality care.</p>
                </div>
            </div>
            <div className="row m-8">
                <div className="col-12">
                </div>

            </div>

            <div>
                <div className="section" style={{ paddingBottom: '30px' }}>
                    <h2>Why Choose Us</h2>
                    <p>Finding the right caregiver can take time, but we're here to help. Our team will work with you to find a caregiver who meets your needs, whether it's helping with daily tasks, providing companionship, or caring for a loved one. Here's why people love our service:</p>
                    {/* <div className="card text-bg-dark" style={{ width: "300px", height: "200px", backgroundImage: "url(https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", backgroundSize: "cover" }}> */}  
                    {/* </div> */}
                </div>

                


            </div>
            <div className="row me-0 justify-content-center">{testimonialData.map((testimonial) => <Testimonial data={testimonial} />)}</div>

                        <div>
            <Link to="/recipes">
                            <div className="header-buttons d-flex justify-content-left">

                                <button className="cta-button-2 "> (Healthy Recipes)Bonus Gift</button>
                            </div>
                        </Link>
                    </div>
                    <div className="d-flex signupbutton justify-content-center">
                        <Link to="/signup-caregiver ">
                            <div className="header-buttons d-flex justify-content-center">
                                <button className="cta-button-1 text-decoration-none ">Become A Caregiver</button>

                            </div>
                        </Link>
                        <Link to="/signup-patient">
                            <div className="header-buttons  d-flex justify-content-center">

                                <button className="cta-button-1 ">Join As A Patient</button>
                            </div>
                        </Link>
                    </div>


            <footer></footer>
        </>
    );
};

export default Home;

