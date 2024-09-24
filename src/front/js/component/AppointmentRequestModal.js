import React, {useState, useContext} from "react";
import {Context} from "../store/appContext.js"

export const AppointmentRequestModal= ({caregiver})=>{
    const {store,actions}=useContext(Context)
    // actions.updateSuccessMessage("")
    // <p>{store.successMessage == "" ? "": store.successMessage}</p>
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so +1
        const dd = String(today.getDate()).padStart(2, '0');
        const hh = String(today.getHours()).padStart(2, '0');
        const min = String(today.getMinutes()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
      };

      const convertToUTC = (localDateTime) => {
        const localDate = new Date(localDateTime);
        return new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000).toISOString();
      };
      

      const [formData, setFormData] = useState({
        caregiverId: caregiver.id,
        dateTime: getTodayDate(), // Default to today's date
        appointmentReason: "",
        is_current: true
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        console.log("Updated formData:", formData)
        
      };
    
    //   const handleSubmit = async () => {
    //    console.log("submitting formData:", formData)
    //     let success = await actions.requestCaregiver(formData)
    //     if (!success) {
    //       alert("An error ocurred while sending your request. Please try again later")
    //     }
    //   };
      
    const handleSubmit = async () => {
        const selectedDateTime = formData.dateTime;
    
        console.log("Selected local dateTime:", selectedDateTime);
      
        let success = await actions.requestCaregiver({
          ...formData,
          dateTime: selectedDateTime, 
          
        });
        if (success){
          alert("Appointment Request Successful.")
        } else if (!success) {
          alert("An error occurred while sending your request. Please try again later.");
        }
      };
    
    return(
        <div class="modal fade" id={"staticBackdrop" + caregiver.id} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">

                                                    <div>
                                                        <div>
                                                            <label htmlFor="caregiver_id">Caregiver</label>
                                                            <input
                                                                type="text"
                                                                id="caregiver_name"
                                                                name="caregiver_name"
                                                                value={caregiver?.name}
                                                                disabled
                    
                                                                
                                                            />
                                                        </div>

                                                       

                                                        <div>
                                                            <label htmlFor="date_time">Date and Time</label>
                                                            <input
                                                                type="datetime-local"
                                                                id="dateTime"
                                                                name="dateTime"
                                                                value={formData.dateTime}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="appointment_reason">Appointment Reason</label>
                                                            <textarea
                                                                id="appointmentReason"
                                                                name="appointmentReason"
                                                                value={formData.appointmentReason}
                                                                onChange={handleChange}
                                                                required
                                                            ></textarea>
                                                        </div>

                                                        
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleSubmit()}>Send Request</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    )
}