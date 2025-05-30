import axios from "axios";
import { useState } from "react";
import "./addMealForm.scss";
function AddMealForm({ toggleFormDisplay }) {
  const [hidden, setIsHidden] = useState(true);

  /* 
    prepares form data before posting to server by creating formData object from the event.target and coverts 
    it to JSON before passing it to the 'postFormData' function.
  */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const bodyFormData = new FormData(event.target);
    const formToJson = axios.formToJSON(bodyFormData);
    postFormData(formToJson);
  };

  //Posts passed in formData to the server.
  function postFormData(formData) {
    axios
      .post(
        "http://localhost:3000/meals/add-new-meal",
        { formData },
        { method: "cors" },
        { withCredentials: true },
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //When button is clicked it toggles the display of the form depending on its current state.
  const handleToggle = (event) => {
    event.preventDefault();
    if (hidden == true) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

  return (
    <div className="addMealBackdrop">
      <form className="addMealForm" onSubmit={handleFormSubmit}>
        <fieldset className="addMealFieldset">
          <label htmlFor="name">Meal Name</label>
          <input id="name" name="name" type="text" required />
        </fieldset>
        <fieldset className="addMealFieldset">
          <label htmlFor="type">Type</label>
          <input id="type" name="type" type="text" required />
        </fieldset>
        <fieldset className="addMealFieldset">
          <label htmlFor="subType">Cuisine</label>
          <input id="subType" name="subType" type="text" required />
        </fieldset>
        <fieldset className="addMealFieldset">
          <label htmlFor="difficulty">Difficulty</label>
          <input type="text" id="difficulty" name="difficulty" required />
        </fieldset>
        <div>
          <button className='formButton' type="submit">Submit</button>
          <button value="addMealForm" onClick={toggleFormDisplay} className='formButton' type="submit">Cancel</button>
        </div>
      </form>
    </div>
  );
}



export default AddMealForm;
