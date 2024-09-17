import { NavItem } from "react-bootstrap";




<div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        <h5 className="card-title">{item.name}</h5>
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <h5 className="card-title">{item.name}</h5>
          </li>
          <li className="list-group-item">
            Date of Birth: {item.date_of_birth}
          </li>
          <li className="list-group-item">
            Email: {item.email}
          </li>
          <li className="list-group-item">
            Phone: {item.phone}
          </li>
          <li className="list-group-item">
            Emergency Contact: {item.emergencyContact}
          </li>
          <li className="list-group-item">
            Allergies: {item.allergies}
          </li>
          <li className="list-group-item">
            Blood Type: {item.bloodType}
          </li>
          <li className="list-group-item">
            Hobbies: {item.hobbies}
          </li>
          <li className="list-group-item">
            Status: {item.is_active ? "Active" : "Inactive"}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
    </div>
  </div>
</div>