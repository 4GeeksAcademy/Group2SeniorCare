import React, { useContext } from "react";
import { Context } from "../store/appContext";






const RecipesApi = () => {
    const { store, actions } = useContext(Context);




    return (
        <div className="container-recipe">

            {store.recipes.length > 0 ?
                store.recipes.map(
                    (recipeObj, index) => {
                        return (
                            <div key={index}>
                                <div class=" w-25 h-25 m-auto">
                                    <img src={recipeObj.thumbnail_url} class="card-img-top" alt={recipeObj.name} />
                                    <div class="card-body text-dark">
                                        <h5 class="card-title text-dark">{recipeObj.name}</h5>
                                        <p class="card-text">{recipeObj.description}</p>
                                        <a 
                                            href={recipeObj.original_video_url} 
                                            class="btn btn-primary"
                                            target="_blank"
                                        >
                                                Video Tutorial</a>
                                    </div>
                                </div>


                            </div>
                        )
                    }
                )
                :
                "no recipes"
            }


        </div>
    );
};


export default RecipesApi;




