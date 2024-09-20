import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";








 export const ProfileSettings = () => {

    const calculateAge= (birthDate) => {

        const today= new Date();
        const date_of_birth= new Date(birthDate);
        let ageYears= today.getFullYear()-date_of_birth.getFullYear();
        return
        `${ageYears} years`;
    }

    return (
        <div className="">
       Hello world
        </div>
    );
};



