import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css"; // Assuming you have custom CSS for additional styles

const CaregiverLogin = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await actions.loginCaregiver(e.target.email.value, e.target.password.value);
        if (success) {
            navigate("/caregiver");
        } else {
            console.log("log in failed");
            alert("Login Failed. Check your credentials and try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle between true/false
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100"> {/* Center vertically and horizontally */}
            <div className="card-1 shadow-lg p-4 rounded-3" style={{ maxWidth: "25rem", width: "100%" }}> {/* Using rem for max-width */}
                <h2 className="text-center mb-4">Caregiver Log-in</h2> {/* Professional-looking header */}
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label className="d-flex justify-content" htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            style={{ padding: "0.625rem" }} // 10px -> 0.625rem padding for input field
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="d-flex justify-content" htmlFor="password">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"} // Dynamically set type
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password"
                                style={{ padding: "0.625rem" }} // 10px -> 0.625rem padding for input field
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
                    <button type="submit" className="btn text-white w-100" style={{background: "#0f4c81"}}>Submit</button> {/* Full width button */}
                </form>
            </div>
        </div>
    );
};

export default CaregiverLogin;
