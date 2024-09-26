import { Link } from "react-router-dom";
import React from "react";
import RecipesApi from "../component/recipesApi";


export const Recipes = () => {
  
    return (
        <div className="recipes m-auto">
       <RecipesApi/>
        </div>
    );
  
};