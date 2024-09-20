import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


const PatientLogin = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await actions.loginPatient(e.target.email.value, e.target.password.value);
        if (success) {
            navigate("/patient")
        } else {
            console.log("log in failed")
        }

    };

    return (
        <div className="container-patientlogin">
            <div className="row">
                <div className="col-md-3 offset-md-3">
                    <h1 className="text-center">Patient Log-in</h1>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="far fa-eye"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PatientLogin;

