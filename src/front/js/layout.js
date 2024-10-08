import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import  Home  from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { CaregiverPortal} from "./pages/CaregiverPortal.jsx";
import { PatientPortal } from "./pages/PatientPortal.jsx";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
// import { Footer } from "./component/footer";
// import  Carousel  from "./component/carousel";
import { SignUp } from "./pages/caregiverSignup";
import { PatientSignUp } from "./pages/patientSignup.js";
import PatientLogin from "./pages/patientlogin.js";
import CaregiverLogin from "./pages/caregiverlogin.js";
import AboutUs from "./pages/aboutus.js";
import PatientProfile from "./pages/patientprofile.js";
import { ProfileSettings } from "./pages/profilesettings.js";
import CaregiverProfile from "./pages/caregiverprofile.js";
import { Recipes } from "./pages/recipes.js";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div  style={{ zoom: .99 }}>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<SignUp />} path="/signup-caregiver" />
                        <Route element={<PatientSignUp />} path="/signup-patient" />
                        <Route element={<CaregiverPortal />} path="/caregiver"/>
                        <Route element={<PatientPortal />} path="/patient" />
                        <Route element={<PatientLogin />} path="/patient-login" />
                        <Route element={<CaregiverLogin />} path="/caregiver-login" />
                        <Route element={<PatientProfile />} path="/patient-profile" />
                        <Route element={<CaregiverProfile />} path="/caregiver-profile" />
                        <Route element={<ProfileSettings />} path="/profilesettings" />
                        <Route element={<Recipes />} path="/recipes" />
                        <Route element={<AboutUs />} path="/about-us" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {/* <Footer /> */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
