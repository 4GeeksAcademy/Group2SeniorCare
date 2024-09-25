import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const PatientLogin = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await actions.loginPatient(email, password);
        if (success) {
            navigate("/patient");
        } else {
            console.log("log in failed");
            alert("Login Failed. Check your credentials and try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle between true/false
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "25rem", width: "100%" }}>
                <h2 className="text-center mb-4">Patient Log-in</h2> {/* Professional-looking header */}
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: "0.625rem" }} // Padding for input
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="password">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"} // Dynamically set type
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ padding: "0.625rem" }} // Padding for input
                            />
                            <div className="input-group-append">
                                <span
                                    className="input-group-text"
                                    onClick={togglePasswordVisibility} // Toggle on click
                                    style={{ cursor: "pointer" }}
                                >
                                    <i className={showPassword ? "far fa-eye-slash" : "far fa-eye"}></i> {/* Change icon */}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button> {/* Full width button */}
                </form>
            </div>
        </div>
    );
};

export default PatientLogin;
