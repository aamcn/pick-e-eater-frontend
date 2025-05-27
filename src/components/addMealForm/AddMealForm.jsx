import axios from "axios";
import { useState } from "react";

function AddMealForm() {
  const [hidden, setIsHidden] = useState(true);
  
  //Prepares form data to be posted to server as JSON. 
  const handleFormSubmit = (event) => {
    event.preventDefault();
    //Creates a formData object from event.target and converts it to JSON before passing it to 'postFormData' as an argument.
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
    <div>
      <button onClick={handleToggle}>Update Meals</button>
      {!hidden && (
        <form onSubmit={handleFormSubmit}>
          <fieldset>
            <label htmlFor="name">Meal Name</label>
            <input id="name" name="name" type="text" />
          </fieldset>
          <fieldset>
            <label htmlFor="type">Type</label>
            <input id="type" name="type" type="text" />
          </fieldset>
          <fieldset>
            <label htmlFor="subType">Cuisine</label>
            <input id="subType" name="subType" type="text" />
          </fieldset>
          <fieldset>
            <label htmlFor="difficulty">Difficulty</label>
            <input type="text" id="difficulty" name="difficulty" />
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default AddMealForm;
