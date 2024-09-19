import React, { useState } from "react";
export const Testimonial = ({data}) => {
  

  return (
    <div class="testimonial" style={{"width": "18rem"}}>
  <img 
    src="https://images.pexels.com/photos/7938741/pexels-photo-7938741.jpeg?auto=compress&cs=tinysrgb&w=800" 
    class="card-img-top" 
    id= "testimonial-img" 
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title text-dark">hi, {data.name}</h5>
    <p class="card-text text-dark">{data.description}</p>
    
  </div>
</div>
  );
};
