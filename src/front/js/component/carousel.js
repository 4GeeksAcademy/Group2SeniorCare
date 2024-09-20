import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const Carousel = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>

                        <div className="carousel-inner">
                            {/* First Slide with Card */}
                            <div className="carousel-item active">
                                <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
                                    <div className="card" style={{ maxWidth: "500px", width: "100%" }}>
                                        <img src="https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top" alt="Caretaker helping elderly person" />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <i className="fa-solid fa-user-group p-2"></i>Fast Matching
                                            </h5>
                                            <p className="card-text">We'll match you with a caregiver within 24 hours.</p>
                                            <a href="#" className="btn btn-primary">Look for a caregiver</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Second Slide */}
                            <div className="carousel-item">
                                <img src="https://images.unsplash.com/photo-1606940743881-b33f4b04d661?w=600&auto=format&fit=crop&q=60" className="d-block w-100" alt="..." style={{ objectFit: "cover", height: "500px" }} />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Second Slide Label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>

                            {/* Third Slide */}
                            <div className="carousel-item">
                                <img src="https://images.unsplash.com/photo-1606940743881-b33f4b04d661?w=600&auto=format&fit=crop&q=60" className="d-block w-100" alt="..." style={{ objectFit: "cover", height: "500px" }} />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Third Slide Label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </div>

                        {/* Carousel Controls */}
                        <button className="carousel-control-prev custom-carousel-control" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next custom-carousel-control" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
